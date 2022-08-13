# What is Drawerio about?
We want to create a service with which you can scrape webcontent, pictures, videos and the Url of a website as a chrome extension. The data will be send to the backend where the frontend can fetch the structured data and present it sorted in drawer.

# User Story
XYZ, wants to save content and the link of a website with as little clicks as possible and then close the website to go on with the research. XYZ then wants to access drawerio.com and access the data after logging in in a sorted list of drawers containing the data as drawerentries.

# Techstack
![Screen_Shot_2022-07-28_at_17.16.12](uploads/b7ef11858e8bd66896cd3af7e9094f10/Screen_Shot_2022-07-28_at_17.16.12.png)
- Programming language: Typescript (backend), Javascript (frontend, extension)
- Backend: nodejs/expressjs
- Frontend: Nextjs (React)
- DB: PostgreSQL
- Website (HTML, CSS, JS)

# Cloudinfrastructure

![Screen_Shot_2022-07-28_at_17.17.45](uploads/e76c206a198e183a195e9d19ef06d5a7/Screen_Shot_2022-07-28_at_17.17.45.png)

- hosted on aws
- Domain name is drawerio.com
- croute from drawerio.com to elastic IP of ec2 container
- ec2 container consists of 4 docker container
   - NGINX container as a reverse proxy to forward internet traffic to the correct container
   - frontend container accessible via /
   - backend container accessible via /api
   - db container accessed by the backend container
- setup can be completed by using docker-compose up -d