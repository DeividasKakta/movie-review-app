# MovieReview application
Movie review application created with Spring Boot and ReactJS

## Get the code
Clone the repository:
#### `git clone https://github.com/DeividasKakta/movie-review-app.git`

## Launching application using Intellij
### Starting up backend server
Open `movie-review-api` directory as a maven project.

run Application

### Starting up frontend server
Open `movie-review-ui` directory as a new project.

Navigate to `movie-review-ui` directory in the terminal and run the command:
#### `npm i`
After module installation is complete, run the following command to start up the server:
#### `npm start`

## Launching application with Spring Boot
### Starting up backend server
Navigate to `movie-review-api` directory in the terminal and run the command:
#### `mvnw spring-boot:run`

### Starting up frontend server
Navigate to `movie-review-ui` directory in the terminal and run the command:
#### `npm i`
After module installation is complete, run the following command to start up the server:
#### `npm start`

## Accessing the application
You can access the application here:
[http://localhost:3000](http://localhost:3000)

To access admin privileges, login in as `admin` with a password: `admin`.

## Database selection
By default MovieReview application uses in-memory database(H2). There is also an option to use MySql database. To do that follow these steps:
### Launching MySql
You can start MySql locally with the properties found in `docker-compose` file in `movie-review-api` directory OR with docker using command in `movie-review-api` directory:
#### `docker-compose up`
### Changing profiles
Before launching the backend server, we need to change spring profile. Using Intellij simply click Maven tab on the side and choose `prod` profile OR in run configuration change Active profiles input to `production`. Using Spring Boot simply run:
#### `mvnw spring-boot:run -Dspring-boot.run.profiles=production`

