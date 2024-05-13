const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const saltRounds = 10;

// Reusable string option
const requiredString = {
  type: String,
  required: true,
  trim: true,
};

// Email regex pattern
const emailRegex = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;

// This is defining the schema
const userSchema = new Schema({
  username: {
    ...requiredString,
    unique: true,
    minlength: 3,
  },
  email: {
    ...requiredString,
    unique: true,
    match: [emailRegex, 'Invalid email format'],
  },
  password: {
    ...requiredString,
    minlength: 8,
  },
  fountains: [{
    type: Schema.Types.ObjectId,
    ref: 'Fountain',
  }],
  saved: [{
    type: Schema.Types.ObjectId,
    ref: 'Fountain',
  }],
});

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to verify passwords
userSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;