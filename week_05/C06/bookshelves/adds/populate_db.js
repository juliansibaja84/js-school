const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require('https');

// Connect to mongoose
mongoose.connect('mongodb://localhost/bookshelves');
const db = mongoose.connection;

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  bookshelf: {
    type: String,
    required: true,
  },
  printType: {
    type: String,
    required: true,
  },
  lent: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    default: '',
  },
  recommendedBy: {
    type: Array,
    default: [],
  },
  downloadLink: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.index({ title: 'text', authors: 'text', description: 'text' });
const Book = mongoose.model('Book', bookSchema);

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ full_name: 'text' });
userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('User', userSchema);

// Saves data inside the specified collection
const saveData = {
  books: (data, callback) => {
    db.createCollection('books');
    const promisesList = [];
    const bookArray = [];
    data.forEach((bookInfo) => {
      let book;
      const bookPromise = new Promise((resolve) => {
        https.get(`https://www.googleapis.com/books/v1/volumes?q=${bookInfo.isbn}&key=AIzaSyBrehTali6aj2QOzBY0yHLGA9WBJ6GT7GE`, (resp) => {
          let raw = '';
          resp.on('data', (chunk) => {
            raw += chunk;
          });
          resp.on('end', () => {
            book = {
              title: JSON.parse(raw).items[0].volumeInfo.title,
              isbn: bookInfo.isbn,
              authors: String(JSON.parse(raw).items[0].volumeInfo.authors),
              image: JSON.parse(raw).items[0].volumeInfo.imageLinks.thumbnail,
              description: JSON.parse(raw).items[0].volumeInfo.description,
              rating: (+JSON.parse(raw).items[0].volumeInfo.averageRating || 0),
              publishedDate: JSON.parse(raw).items[0].volumeInfo.publishedDate,
              pageCount: +JSON.parse(raw).items[0].volumeInfo.pageCount,
              bookshelf: bookInfo.bookshelf,
              printType: JSON.parse(raw).items[0].volumeInfo.printType,
              lent: bookInfo.lent,
              user: bookInfo.user,
              recommendedBy: bookInfo.recommendedBy,
              downloadLink: (bookInfo.downloadLink) ? bookInfo.downloadLink : '',
            };
            bookArray.push(book);
            resolve();
          });
        });
      });
      promisesList.push(bookPromise);
      return book;
    });
    Promise.all(promisesList).then(() => {
      bookArray.forEach((book) => {
        Book.create(book);
      });
    });
  },
  users: (data, callback) => {
    User.create(data, callback);
  },
};

// function saveData(data, collection, callback) {
//  db.createCollection(collection, {}, () => {
//    db.collection(collection).insert(data, callback);
//  });
// }

// Read the data and save it into the db
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) throw err;
  // saveData(JSON.parse(data).books, 'books');
  // saveData(JSON.parse(data).users, 'users');
  //saveData.users(JSON.parse(data).users, () => mongoose.disconnect());
  saveData.books(JSON.parse(data).books, () => mongoose.disconnect());
});
