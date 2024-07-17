const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = 
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us you name!'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide you email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    password: {
      type: String,
      required: [true, 'please provide a password'],
      minlength: 8,
      // max: 250,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'please confirm a password'],
      minlength: 8,
      
      validate: {
        // This only works on CREATE ans SAVE!!!
        validator: function(el) {
          return el === this.password
        },
        message: 'Passwords are not the same!'
      }

    }
  })

const User = mongoose.model('User', userSchema)

module.exports = User;