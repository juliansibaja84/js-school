const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Book } = require('./models/book');
const { User } = require('./models/user');

// Connect to mongoose
mongoose.connect('mongodb://localhost/bookshelves');

const app = express();
const PORT = 5001;
const secret = 'TheDragonAllwaysHasAhidenTrick';

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], secret, (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Please use a valid endpoint');
});

// Get one book
app.get('/api/books', User.loginRequired, (req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  }, {}, 1);
});

// Add a book
app.post('/api/books/', User.loginRequired, (req, res) => {
  Book.addBook(req.body, (err, book) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(book);
  });
});

// Get all the books
app.get('/api/books/all', User.loginRequired, (req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  },
  (req.query.BS) ? { bookshelf: req.query.BS } : {});
});

// Get all the books that match the title, description and authors with the string passed
app.post('/api/books/all/search', User.loginRequired, (req, res) => {
  Book.searchBooks(req.body, (err, books) => {
    if (err) {
      res.status(400).json(err.message);
      throw err;
    }
    res.json(books);
  },
  (req.query.BS) ? { bookshelf: req.query.BS } : {});
});

// Get one book if the id is passed or all if the id is 'all'
app.get('/api/books/:_id', User.loginRequired, (req, res) => {
  Book.getBook(req.params._id, (err, book) => {
    if (err) {
      res.status(404).json(err);
    }
    res.json(book);
  });
});

// Delete a Book
app.delete('/api/books/:_id', User.loginRequired, (req, res) => {
  Book.deleteBook(req.params._id,(err, book) => {
    if (err) {
      res.status(404).json(err.message);
    }
    res.json(book);
  });
});

// Lend a book
app.put('/api/books/:_id/lend/', User.loginRequired, (req, res) => {
  Book.lendBook(req.params._id, req.user._id,(err, book) => {
    if (err) {
      res.status(404).json(err.message);
    }
    res.json(book);
  });
});


// Authentication handlers

app.post('/api/auth/register', (req, res) => {
  User.register(req.body, (err, user) => {
    if (err) {
      throw err;
    }
    return res.json(user);
  });
});

app.post('/api/auth/login', (req, res) => {
  User.signIn(req.body, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        res.json({ token: jwt.sign({ email: user.email, fullName: user.full_name, _id: user._id}, secret)});
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Running Books API on port ${PORT}`);
});
