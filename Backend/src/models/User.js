// models/User.js
import mongoose from 'mongoose';

const popSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  nin: {
    type: String,
    required: true,
    unique: true
  }
});

const userSchema = new  mongoose.Schema({
    username: { 
      type: String,
      required: true
    },
    email: { 
      type: String,
      required: true
    },
    password: { 
      type: String,
      required: true
    },
    created: {
      type: Date,
      required: true,
      default: Date.now(),
    }, 
    updatedAt: {
      type: Date, 
      default: Date.now(),
    }, 
    is_admin: {
      type: Number,
      required: true
    },
    is_verified: {
      type: Number,
      default: 0
    },
})



const Population = mongoose.model('Population', popSchema);
const User = mongoose.model('User', userSchema);

export {Population, User};


