# RUN PROJECT

1. Run Docker app on your pc;
2. Open project in terminal and run command:
    
>npm run docker:up

    Docker will installed all dependencies from package.json

3. Project will start on `localhost:3000`;
4. For stop the project run command:
>npm run docker:down


# Basic commands
___
>docker-compose up
> 
`Create and start containers`
___
>docker-compose up --build

`Build images before starting containers`
___
> docker-compose down

`Stops Docker and removes all containers`
___

>docker-compose down --rmi all

`Stops Docker and removes all containers and images`
