const mongoose = require('mongoose');

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

// Get Books
Book.getBooks = (callback, query, limit) => {
  Book.find(query, callback).limit(limit);
};

// Get a Book by Id
Book.getBook = (id, callback) => {
  Book.findById(id, callback);
};

// Add a Book
Book.addBook = (book, callback) => {
  Book.create(book, callback);
};

// Delete Book by Id
Book.deleteBook = (id, callback) => {
  const query = { _id: id };
  Book.remove(query, callback);
};

// Lend a book
Book.lendBook = (id, userId, callback) => {
  const query = { _id: id };
  const status = { lent: true, user: userId, lentDate: Date.now() };
  const update = { $set: { status } };
  Book.update(query, update, () => {
    Book.find(query, callback);
  });
};

Book.searchBooks = (stringToMatch, callback) => {
  Book.find({ $text: { $search: stringToMatch.searchString } }, callback);
};

Book.getBorrowedBooks = (userId, callback) => {
  const query = { 'status.user': userId };
  Book.find(query, callback);
};

module.exports.Book = Book;
