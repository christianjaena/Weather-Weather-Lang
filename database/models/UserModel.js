const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const userSchema = new Schema(
  {
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

const UserSchema = Model('User', userSchema);
module.exports = UserSchema;
