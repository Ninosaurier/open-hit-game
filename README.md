# Open Hit Game

## Introduction
Just a game, which works like Hitstar, but with songs from video games. I use:

- Spring
- Nginx
- Docker
- Angular
- PostgreSQL

Feel free to use the repo. I always try to keep the repo up to date.
Please bear with me, it is just a hobby project.

The installation works for Linux. I do not know, if the installation works for the Windows subsystem.
You are welcome to clone the repo and run it in Windows. I will gladly extend the description with a Windows chapter.

## 1. Installation

### 1.1 Clone the project
`git clone https://github.com/Ninosaurier/open-hit-game.git`

### 1.2 Go in the project folder
`cd open-hit-game.git`

### 1.3 Build the docker image:
`docker compose build`.

### 1.4 Start the containers
But before you start the containers, the line:
```json
ng serve frontend --host 0.0.0.0 --port 4200 --no-hmr
```
in the _docker-compose.yml_, is commented out. This is **important for the beginning**, otherwise the _Angular container_ will *not start*!
The command will start the Angular project, but will immediately print an error message, because there is no _package.json_. Therefore we have to comment out the line first.
Start the container: `docker compose up -d`.

With `docker ps` you will have the following output:

```bash
> $ docker-compose ps
        Image ...     Ports                                                Names
--------------------------------------------------------------------------------------------------
open-hit-game_angular      0.0.0.0:4200->4200/tcp, :::4200->4200/tcp    angular
open-hit-game_nginx        0.0.0.0:80->80/tcp, :::80->80/tcp, 443/tcp   nginx
open-hit-game_spring       0.0.0.0:8080->8080/tcp, :::8080->8080/tcp    spring
postgres:alpine            0.0.0.0:5432->5432/tcp, :::5432->5432/tcp    postgres_database
```

Afterwards, please add following configuration in the angular.json:
```json
{
  "serve": {
    "options": {
      "allowedHosts": ["angular"]
    }
  }
}
```
This allows you, to reach the containers with URL via `http://angular.localhost`.

### 1.6 Install dependencies in the frontend
Install the NPM packages:
```bash
docker exec -it npm run install
```
Afterwards activate the line in the docker-compose.yaml:
```json
ng serve frontend --host 0.0.0.0 --port 4200 --no-hmr
```
An restart the container

### 1.7 Try it!
Open your browser and make sure everything worked.
The Angular container can be accessed via the URL `http://angular.localhost` and the Spring container via `http://spring.localhost`.

### 1.8 Generating with OpenAPI
Command for generating the OpenAPI:
```bash
docker exec -it angular npx @openapitools/openapi-generator-cli generate   -i ../openapi/open-hit-game-api.yaml   -g typescript-angular   -o ../frontend/src/app/generated --additional-properties=basePath='',providedInRoot=true
```

## 2 Documentation
I use compodoc and inline documentation. Extern documentation only for complex structure. To see it run:
```bash
docker exec -it angular npm run compodoc
```

## 3 Nginx logs
The logs are cached and you will find them in project folder _workDir/logs_.

## 4 Useful Commands

- Shows all running containers: `docker ps`
- If you want to use the shell from the container itself: `docker exec -it <container_name> sh`

## 5 FAQ

### 5.1 How can i change the user ownership? I can not edit files.
- Command: `sudo chown -R $USER ./workDir/*`.

### 5.2 How can I change the working directory of a Docker container?
- Please make yourself familiar with the commands of [Docker](https://docs.docker.com/compose/). Use the respective "Dockerfile" for changes. But be careful! If you change the working directory, then you must also do it in the respective configuration files of the Nginx. The **angular.conf** contains the working directory where Nginx will look for the Angular project!
