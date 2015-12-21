FROM nodesource/node:jessie
# Bundle app source

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD dist/package.json package.json
RUN npm i --production

COPY dist /usr/src/app

#Ports
EXPOSE 8080

ENV NODE_ENV production

COPY deploy/run_epa.sh /usr/src/app/
RUN chmod +x run_epa.sh

ENTRYPOINT ["sh", "run_epa.sh"]
