// models/User.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
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
    post:{
      posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        // required: true
      }]
    },
    cart: {
      totalPrice: {type: Number, default: 0},
      items: [{
        name: {
        type: String,
        required: true
        },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
        },
      quantity: {
        type: Number,
        required: true
        },
      price: {
        type: Number,
        },
      image: {
        type: String,
        }
      }]
    },
    orders:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    }],
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



const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

export {Post, User};


