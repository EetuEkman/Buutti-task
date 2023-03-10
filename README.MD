This is a repository for the solution to Buutti full-stack task.

## About

The application is ASP.NET Core with React.js because of the requirement to start the app from the command line with a single command.

I chose SQLite mainly for it's portability and ease of use. SQLite database provides all the required database functionality. The database file is included in the repo and included in the built app. This way the project doesn't depend on any installed database system but works right outside the box.

## Requirements

* Node package manager for installing client side dependencies
* .NET SDK (tested on 7.0.100) to build and host the project

The app was tested on Windows 11.

## Running

After cloning, go to Buutti-task/Buutti-task subfolder and run the command `dotnet run`.

Then open your browser and navigate to https://localhost:7134

This should start and redirect to the user to the SPA development server.