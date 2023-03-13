This is a repository for the solution to Buutti full-stack task.

## About

The database is [PostgreSQL](https://www.postgresql.org/) for variety.

The api is ASP.NET Core Web Api.

The front end is React with TypeScript.

## Requirements

* [PowerShell 7](https://github.com/PowerShell/PowerShell)
* [Docker](https://www.docker.com/)

## Running

Make sure you have Docker properly installed and running.

After cloning, if on Windows go to project folder and use Unblock-File cmdlet to allow the script to run with the command `PS> Unblock-File .\setup.ps1`. 

Start the script with command `PS> .\setup.ps1`.

After the containers are up and running open your browser and navigate to http://localhost:5050.