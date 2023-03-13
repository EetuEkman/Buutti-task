#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["buutti-api/buutti-api.csproj", "buutti-api/"]
RUN dotnet restore "buutti-api/buutti-api.csproj"
COPY . .
WORKDIR "/src/buutti-api"
RUN dotnet build "buutti-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "buutti-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "buutti-api.dll"]