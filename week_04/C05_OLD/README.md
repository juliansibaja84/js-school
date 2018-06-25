# Challenge 5

The challenge of this week does not requiere much explanation, all the files
needed to run it are in the current folder, just open _home.html_. For the requests
of the books data from the Google API, Promises and await/async were used. The
API gives a quota for the number of request that can be made. I got an API-KEY
with a limit of 1000 request per day. If the limit of the requests is reached the API will give a 403 error and may be necessary to wait for the next day or
change the API-KEY inside the _fetchBooks()_ function in the _books.js_ file.