# Getfit

## Important note
I left the env on purpose, I would never do that in a normal scenario but just for this test and for you to be able to run it I did not include it in .gitignore!!!!!

## Description
This is just a simple test where I used a monorepo trying to mimic two microservices that can be deployed individually. Tried to follow the clean architecture features where the domain (entities and use-cases) are separated from the implementation and the framework. All the dependencies are injected, respecting the dependency inversion principle and SOLID. 

## Structure
In this monorepo we have two applications, one that handles the user and authentication and the other that handles the exercise business context. 
#### App
The app part handles the routing of the requests. Directs the request to the appropriate use case to handle it 

#### Libs
In this section we have the domain for user, exercise and the general domain shared by all the entities. 

* Domain\
Domain has the business rules for the handling of the JWTs, exceptions, Logger, etc... used through the application

* User\
User has all the entities and use cases related to the user context, including adding users, login, authorization etc.....

* Exercise\
Exercises contains all the entities and business rules for the exercises

* Infra\
This lib contains all the technical details, configuration, implementations (database, filters, jwt, logger, exceptions implementations, etc...)
The most interesting part is the Module Usecases proxy. this module is the link between the use cases and the infrastructure, services are injected into the use cases. In this way, it will be easy to change services in the future and we respect the dependency injection (SOLID)


### Running it locally
```sh
npm install
npm run serve_all
```



### Running it with docker
```sh
npm install
npm run deploy:user    
npm run deploy:exercise
docker-compose --env-file .local.env  up -d 
```


### Endpoints
. add user\
```
curl --location --request POST 'http://localhost:3333/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "pepito",
    "password": "Abc123"
}'

```
. get login token

```
curl --location --request POST 'http://localhost:3333/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "pepito",
    "password": "Abc123"
}'
````

. add exercise
```
curl --location --request POST 'http://localhost:3334/exercise/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGl0byIsImlhdCI6MTY2NTkzODA2MCwiZXhwIjoxNjY2NTQyODYwfQ.65yq6we7-4nakYoLDJ8y4DHiuTm_5RwynGDLDRsWJS8' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "Abc123"
}'
```

. get exercises
```
curl --location --request GET 'http://localhost:3334/exercise/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGl0byIsImlhdCI6MTY2NTkzODA2MCwiZXhwIjoxNjY2NTQyODYwfQ.65yq6we7-4nakYoLDJ8y4DHiuTm_5RwynGDLDRsWJS8'
```

#### DB
I used sqlite for simplicity, in the repo there is some persistance of the data in the collection user, on the root folder, so the curls above should work. I tried to mimic a microservice env where each service has its own DB, thats why there is no relations between tables. I could have used a one-to-many relationship between user and exercises and thus get the name of the user for each exercise, but decided to treat it as single databases...... 

#### Unit test
I wished I could have more time to add more test, but unfortunely I don't have much time, if required I can try 