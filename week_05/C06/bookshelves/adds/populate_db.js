const mongoose = require('mongoose');
const fs = require('fs');

// Connect to mongoose
mongoose.connect('mongodb://localhost/bookshelves');
const db = mongoose.connection;

// Saves data inside the specified collection
function saveData(data, collection) {
  db.createCollection(collection, {}, () => {
    db.collection(collection).insert(data, () => mongoose.disconnect());
  });
}

// Read the data and save it into the db
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) throw err;
  saveData(JSON.parse(data).books, 'books');
  saveData(JSON.parse(data).users, 'users');
});
