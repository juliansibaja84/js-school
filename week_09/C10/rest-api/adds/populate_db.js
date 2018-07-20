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
  status: {
    lent: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      default: '',
    },
    lentDate: {
      type: Date,
    },
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
    default: '',
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
    trim: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  profile_img_url: {
    type: String,
    default: 'https://image.ibb.co/hYQixT/profile.png',
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
    const promisesList = [];
    const bookList = [];
    data.forEach((bookInfo) => {
      let book;
      const bookPromise = new Promise((resolve) => {
        https.get(`https://www.googleapis.com/books/v1/volumes?q=${bookInfo.isbn}&key=AIzaSyCAyQ4sS8x1SZ0vH35fpScidrS8Dh5CIDo`, (resp) => {
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
              status: {
                lent: false,
                user: '',
                lentDate: Date.now(),
              },
              downloadLink: (bookInfo.downloadLink) ? bookInfo.downloadLink : '',
            };
            bookList.push(book);
            Book.find({ isbn: bookInfo.isbn }, (err, result) => {
              if (!result[0]) {
                Book.create(book, () => resolve());
                console.log(`Book ${book.isbn} added`);
              } else {
                console.log(`Book ${book.isbn} updated`);
                Book.update({ isbn: book.isbn }, book, () => resolve());
              }
            });
          });
        });
      });
      promisesList.push(bookPromise);
    });
    Promise.all(promisesList).then(() => callback());
  },
  users: (data, callback) => {
    User.create(data, callback);
  },
};

// Read the data and save it into the db
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) throw err;
  saveData.users(JSON.parse(data).users);
  saveData.books(JSON.parse(data).books, () => mongoose.disconnect());
});