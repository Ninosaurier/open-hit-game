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
But before you start the containers, the line "command: ng serve frontend --host 0.0.0.0 --port 4200" in the _docker-compose.yml_, is commented out. This is **important for the beginning**, otherwise the _Angular container_ will *not start*!
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

### 1.5 Initialize the Angular project.
The recommended working directory is **/var/www/frontend** of the Angular container.
Now, create the Angular project with following command:
- `docker exec -it angular sh /usr/share/scripts/initAngularProject.sh`

The working directory is declared as **:cached**, so you will find (after restarting all container in chapter 1.7) the new initialized project in **./workdir/frontend/**.

### 1.6 Get the Spring boot application
1. Go to [Spring initializr](https://start.spring.io/).
2. Set the project on **Maven** and language on **Java**
3. Choose your Spring boot version
4. Change the project metadata or take the example data
5. Choose a Java version (Be careful! You need the same version like in the dockerfile in the folder spring!)
6. Go to dependencies and add:
    - Spring Boot DevTools
    - Spring Web
    - Lombock
7. Generate and download it
8. Unzip the file
9. Copy all files in the folder in the project **workDir/backend/**

### 1.7 Start the containers
Start the containers with `docker compose up -d`.

### 1.8 Try it!
Open your browser and make sure everything worked.
The Angular container can be accessed via the URL `http://angular.localhost` and the Spring container via `http://spring.localhost`.

### 1.9 Do you need MySQL? Edit the docker-compose.yml
If you need MySQl, comment out the section after "db", and enable the lines needed for the MySQL container.
In the Spring section, you would then also have to activate the correct lines under "links". Of course you can also create a MongoDB and MySQL container.

### Nginx logs
The logs are cached and you will find them in project folder _workDir/logs_.

## Useful Commands

- Shows all running containers: `docker ps`
- If you want to use the shell from the container itself: `docker exec -it <container_name> sh`

## FAQ

#### How can i change the user ownership? I can not edit files.
- Command: `sudo chown -R $USER ./workDir/*`.

#### How can I change the working directory of a Docker container?
- Please make yourself familiar with the commands of [Docker](https://docs.docker.com/compose/). Use the respective "Dockerfile" for changes. But be careful! If you change the working directory, then you must also do it in the respective configuration files of the Nginx. The **angular.conf** contains the working directory where Nginx will look for the Angular project!


# License
Legally, I don't know if I can declare the repo with a GPL3 license.

But definitely feel free to copy, modify or even improve the repo.
I have one request: If you have any improvements, please let me know. Would love to include them too :)
