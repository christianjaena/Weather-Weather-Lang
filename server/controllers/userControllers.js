const UserSchema = require('../../database/models/userModel');

function getUsersController() {}

function getUserByIdController() {}

const addUserController = async (req, res) => {
  const { email, password } = req.body;
  const inputModel = { email, password };
  const User = new UserSchema(inputModel);

  User.save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

function updateUserByIdController() {}

function deleteUsersController() {}

function deleteUserByIdController() {}

module.exports = {
  getUsersController,
  getUserByIdController,
  addUserController,
  updateUserByIdController,
  deleteUsersController,
  deleteUserByIdController,
};
