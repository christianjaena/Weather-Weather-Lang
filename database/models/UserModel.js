const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = Model('User', userSchema);
module.exports = UserModel;
