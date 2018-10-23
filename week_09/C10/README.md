# Challenge 10

For this challenge, Web sockets and observables were implemented within the application. Next is a documentation on how to set up both the rest api and the web application.

## REST API

To run the API a few requirements are needed. [Node](https://nodejs.org/en/) and
[MongoDB community](https://www.mongodb.com/download-center?jmp=nav#community)
 need to be installed.

Run ```npm install``` inside the bookshelves folder to update the dependecies.

It is also needed to start the service of mongoDB, that can be done by running
the following command (tested in debian):

    sudo service mongodb start

For other distros of linux or another OS read the documentation [here](https://docs.mongodb.com/manual/administration/install-community/).

### Populate the db

For testing purposes the database can be populated running a script with the
name of populate_db.js inside _bookshelves/adds_. Also, new data can be generated
using the API endpoints.

### Run the server

The server can be started running ```node server.js``` inside the _rest-api_ folder,
another way to do it is to use the _nodemon_ package. The server will run by default
in the port 5001.

## Web application

Run ```npm install``` inside the bookshelves folder to update the dependecies.

Once the REST API Server is prepared, run ```npm start``` inside the _bookshelves-app_
folder in the current directory. The DB server will be running in the port 5001 and
the application in the 3000.

The emails *admin@auth.com* and *jusiba84@gmail.com* can be used to log into the app.
Both of them have the password **1234**.
