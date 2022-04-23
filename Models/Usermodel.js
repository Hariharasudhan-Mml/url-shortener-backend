const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    verified: {
      type: Boolean,
      default: false,
    },
    data: [
     {
       type:mongoose.Types.ObjectId,
       ref:"data",
       default:null
     }
      
    ]
  },
  { timestamps: true }
);

const User = mongoose.model('users', Schema);
module.exports = User;
