# [The Power of BTU](http://powerofbtu.com/)

## The Deloitte Digital Approach

At Deloitte Digital, we have a core belief that great design doesn’t just happen. Ideas alone are common. It takes discipline, research, and talented and creative minds to make insights into something tangible that we can build, test, and iterate on. In this section, we will describe our approach towards building the prototype for the EPA Environmental Digital Services RFI.
Taking a project from concept to completion requires a flexible approach enabling ongoing evaluation. We developed our prototype using the **Studio Agile Model** where small, highly-coordinated, cross-functional teams release working builds during sprint cycles organized into four phases: (1) Discovery, (2) Design, (3) Develop, and (4) Deploy.

In a short time span of 7 business days we were able to ideate, design, and deploy the first iteration of this product. The initial release was engineered to be viewed on desktops with 1280x800 resolution. As indicated in our wireframes and visual compositions, future iterations will feature a responsive design for optimized experience on all devices.

### 1. Discovery

We’re all about the user. Discovery is about quickly learning as much as we can about the available data, users, their problems, expectations, and pain points. We utilized human-centered design tools and techniques, which include **ethnographic research**, **rapid prototyping**, and **personas**.

We also conducted our **sprint planning** and set up our backlog of user stories and prioritization in Jira. During this sprint, our team added and prioritized new user stories based on user feedback and usability testing.


### 2. Design

After reviewing the publicly available environmental APIs, our team members sketched out initial concepts for discussion and iteration. The **wireframes** were created in Omnigraffle and moved into concept validation.

After visual compositions were created, a high fidelity **prototype** was created using InVision. Our interaction designer conducted **usability testing**, resulting in feedback used to update designs and prioritize features. This allowed us to identify usability issues early on, resulting in significant time savings further on in the development process.


### 3. Develop

Our team created the app scaffolding using the Angular Fullstack Yeoman Generator and set up our environments with Amazon Web Services (AWS) CloudFormation. Our pipeline was designed to maximize the speed with which we can deploy a feature, while adhering to QA and configuration management processes critical to building a quality product.

### 4. Deploy

We deploy using an automated process with containerized deployments, maximizing our deployment speed while reducing the risk of environment inconsistencies. Our CI server, CircleCI, monitors the GitHub repository for changes made to the production branch, and after passing unit tests, builds the application in a Docker container, ships it to the Hub, then deploys it via AWS Elastic Container Service (ECS). We’re able to handle all kinds of cloud and collocated infrastructures, but prefer the flexibility and consistency of ECS and CloudFormation.

## Previous Experience with Agencies of the U.S. Federal Government

With our capabilities, agencies can bring us their biggest challenges, assured we can bring a new vision to life with digital. We’ve reimagined and implemented an enhanced website experience and modernized web content management platform for the US Navy. We’ve designed and deployed a self-service portal and complimentary applications suite—driving enhanced operations with greater efficiencies for the Federal Government. We’re currently unifying a dispirit workforce through a cross-platform mobile news experience that consolidates and amplifies agency communications.
