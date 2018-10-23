const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

User.register = (userData, callback) => {
  const newUser = new User(userData);
  newUser.hash_password = bcrypt.hashSync(userData.password, 10);
  User.create(newUser, callback);
};

User.signIn = (authData, callback) => {
  User.findOne({ email: authData.email }, callback);
};

User.loginRequired = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized user!' });
};

module.exports.User = User;
