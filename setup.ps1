#Requires -Version 7

docker pull mcr.microsoft.com/dotnet/aspnet:7.0 | Out-Null;

docker pull node:19-alpine | Out-Null;

docker pull nginx:1.23-alpine | Out-Null;

# Remove existing containers and images.

docker stop buutti-db-container | Out-Null;

docker stop buutti-api-container | Out-Null;

docker stop buutti-client-container | Out-Null;

docker rm buutti-db-container | Out-Null;

docker rm buutti-api-container | Out-Null;

docker rm buutti-client-container | Out-Null;

docker rmi buutti-db-image:1.0.0 | Out-Null;

docker rmi buutti-api-image:1.0.0 | Out-Null;

docker rmi buutti-client-image:1.0.0 | Out-Null;

# Docker network to allow the containers to talk to each other.

docker network rm buutti-network | Out-Null;

docker network create buutti-network | Out-Null;

# Build image and create container for the database.

Set-Location (Join-Path $PSScriptRoot buutti-db);

docker build --tag buutti-db-image:1.0.0 ./ | Out-Null;

docker run --detach --network buutti-network --name buutti-db-container -p 5432:5432 buutti-db-image:1.0.0 | Out-Null;

# Build image and create container for the api.

Set-Location (Join-Path $PSScriptRoot buutti-api);

docker build --tag buutti-api-image:1.0.0 --file buutti-api/Dockerfile . | Out-Null;

docker run --detach --network buutti-network --name buutti-api-container -p 5005:80 buutti-api-image:1.0.0 | Out-Null;

# Build image and create container for the client.

Set-Location (Join-Path $PSScriptRoot buutti-client);

docker build --tag buutti-client-image:1.0.0 . | Out-Null

docker run --detach --network buutti-network --name buutti-client-container -p 5050:80 buutti-client-image:1.0.0 | Out-Null

Set-Location $PSScriptRoot