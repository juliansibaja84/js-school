# Challenge 06

For this challenge a restful API using Node, mongoDB and express was constructed
, the API is inside the bookshelves folder. To run the API a few requirements
are needed. [Node](https://nodejs.org/en/) and [MongoDB community](https://www.mongodb.com/download-center?jmp=nav#community) need to be installed.

Run ```npm install``` inside the bookshelves folder to update the dependecies.

It is also needed to start the service of mongoDB, that can be done by running
the following command (tested in debian):

    sudo service mongodb start

For other distros of linux or SO read the documentation [here](https://docs.mongodb.com/manual/administration/install-community/).


## Populate the db

For testing purposes the database can be populated running a script with the
name of populate_db.js inside _bookshelves/adds_. Also, new data can be generated
using the API endpoints.

## Run the server

The server can be started running ```node app.js``` inside the bookshelves folder,
another way to do it is to use the nodemon package. The server will run by default
in the port 5001.

## Endpoints

The API have many endpoints to interact with, next is a table with the description
of each one of them, **ALL** the endpoints need athorization to work correctly,
**excepts** for the _/api/auth_ ones.

| Endpoint  | Method | Description |
|:--|:-:|---|
|/api/books/|GET|Gets the data for the first Book|
|/api/books/|POST|Adds a Book, a book object has to be sent in the request body, the model for the book is shown [below](#book)|
|/api/books/:id|GET|Gets the data for the book with the specified id|
|/api/books/:id|DELETE|Removes the book with the specified id from the DB|
|/api/books/:id/lend|PUT|Sets the "lent" and "user" properties of the specified book (id) to true and the logged user respectively|
|/api/books/all|GET|Gets all the books data, to filter by bookshelf, pass a BS param with the name of the bookshelf, like so: /api/books/all?BS=quito, the available booksheves names are quito, medellin, cartagena and digital|
|/api/books/all/search|POST|Get all the books that match the title, description and authors with the string passed, a searchString has to be sent in the request body, see the model [bellow](#search).|
|/api/auth/register|POST|Adds a new user, a user object has to be sent in the request body, the model of the user is shown [below](#user)|
|/api/auth/login|POST|Generates a JWT once the information sent in the request body as an object with the properties of "email" and "password" is authenticated. Then, the JWT can be sent in the header of the request to the other endpoints to authenticate the user.|

## Usage Example

For this examples requests for get all the books, a specific book and lend a book will be made.

To use the APi first is needed to get access to the endpoints with the JWT. In the Database are some users to use for this purpose. For this example the admin user will be used. So, to get the JWT send a POST request to the _/api/auth/login_, in the header put a "Content-Type" of "application/json", and within the body of the request put the following:

```js
{
  "email": "admin@auth.com",
  "password": "1234"
}
```

When that is request is send, hopefully the API will respond with a token with this extructure:

```js
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGF1dGguY29tIiwiZnVsbE5hbWUiOiJhZG1pbiIsIl9pZCI6IjViMmRjOGM5YjgyYzZmMTkxZTI5YjUwMyIsImlhdCI6MTUyOTcyNzMwMX0.wxcOu1SBs9rXBWfW1-XPBQvrQmBEBFQfjn9SgyShBOo"
}
```

Then this token can be sent in the requests headers to interact with the rest of the endpoints.

Now, to **get all the books** a GET request to /api/books/all has to be made. Add a header with the key of "Authorization" and for the value concatenate "JWT"+" "+token, like this:

    jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWF...

If all is correct, then the API will respond with a array of books.

**NOTE**: To filter the books use the param ?BS=bookshelfName, where _bookshelfName_ is one of the names described in the [Endpoints](#endpoints) section.

To **get only one book** the id of the book is needed, so a simple method to get an id is with request of above. The id is found as "_id":"5b2dc8c9b82c6f191e29b4f7" for example. When the id is obtained use /api/books/5b2dc8c9b82c6f191e29b4f7 to make a GET request with the same header used above. Then the book should be obtained thorough the response.

To **lend** this book a PUT request has to be made on the /api/books/5b2dc8c9b82c6f191e29b4f7/lend, the header also needs to have the JWT token as the two previous requests. That should be enough, then to verify that the book cahnged its stated, get that book information with the former request and see the lent, and the user properties, that will show something like this:

    "lent":true,"user":"5b2dc8c9b82c6f191e29b503"

## Models

### Book

```js
{
  title: String,
  isbn: String,
  authors: [
    String,
    String,
    ...,
    String,
  ],
  image: String,
  description: String,
  rating: Number,
  publishedDate: String,
  pageCount: Number,
  bookshelf: String,
  printType: String,
  lent: Boolean,
  user: String,
  recommendedBy: String,
  downloadLink: String,  
}
```

### User

```js
{
  "full_name": String,
  "email": String,
  "password": String
}
```

### Search

```js
{
  "searchString": String
}
```