const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const favoriteSchema = new Schema(
  {
    woeid: {
      type: String,
      required: true
    },
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FavoriteModel = Model('Favorite', favoriteSchema);
module.exports = FavoriteModel;



