const mongoose = require("mongoose");
//const categories = require("categories");

const categories = Object.freeze([
  "Person",
  "Place",
  "Thing",
  "Idea",
  "Other",
]);


const likeSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  category: {
    type: String,
    required: true,
    enum: categories
  },
  likes: {
    type: Number,
    required: true,
    default: 1,
    validate(value) {
      if (value < 0) {
        throw new Error("Like should be a natural number!");
      }
    },
  },
  username: {
    type: String
  }
},{ collection: "likes", timestamps: true }
);
 
module.exports = mongoose.model('Like', likeSchema);

/*
user: {
           type: String,
           ref: 'User',
           required: true,
       },*/