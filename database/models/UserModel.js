const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = Model('User', userSchema);
module.exports = User;
