const FavoriteModel = require('../../database/models/FavoritesModel');

const addToFavoritesController = async (req, res) => {
  const { woeid, userID, location } = req.body;

  let favorite = await FavoriteModel.findOne({ woeid });
  let favoriteExists = [favorite];
  // LINQ - arr.first();
  if (favoriteExists.first()) {
    res.status(400).json([{ message: 'Already in favorites!' }]);
  } else {
    favorite = new FavoriteModel({
      woeid,
      userID,
      location,
    });

    favorite
      .save()
      .then(() =>
        res.status(200).json([
          {
            message: 'Added to favorites!',
          },
        ])
      )
      .catch((err) => res.status(400).json([{ message: err.message }]));
  }
};

const getUserFavoritesController = async (req, res) => {
  let userID = req.params.id;
  FavoriteModel.find({ userID })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err.message));
};

const deleteUserFavoritesController = async (req, res) => {
  FavoriteModel.deleteOne({ woeid: req.params.id })
    .then((result) => res.status(200))
    .catch((err) => res.status(400).json(err.message));
};
module.exports = {
  addToFavoritesController,
  getUserFavoritesController,
  deleteUserFavoritesController,
};
