#!/bin/bash

aws configure set region $AWS_REGION

deploy_image() {
	docker login --email="$DOCKER_EMAIL" --username="$DOCKER_USERNAME" --password="$DOCKER_PASS"
	docker build -t deloittedigitaldc/epa:latest .
	docker push deloittedigitaldc/epa:latest
}

runningCount() {
	count=`aws ecs describe-clusters --clusters $ECS_CLUSTER | grep runningTasksCount | tr "/" " " | awk '{print $2}' | sed 's/,$//'`
	echo $count
}

restart_cluster() {
	#Set the desired count to 0 to stop exising tasks
	aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --desired-count 0 > /dev/null

	for attempt in {1..180}; do
		if [ $(runningCount) -eq 1 ]; then
			echo "Waiting for tasks to deregister, tasks remaining $(runningCount)"
			sleep 10
		else
			#Tasks deregistered, lets set the desired count back to 1 and wait for the task to restart
			echo "Task deregistered"
			aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --desired-count 1 > /dev/null
			for attempt in {1..180}; do
				if [ $(runningCount) -eq 0 ]; then
					echo "Waiting for task to reregister"
					sleep 10
				else
					echo "Task registered, service restarted"
					return 0
				fi
			done
		fi
	done
	echo "Tasks failed to deregister in time"
	return 1
}

deploy_image
restart_cluster
