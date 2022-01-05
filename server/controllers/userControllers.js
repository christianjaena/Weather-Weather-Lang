const UserModel = require('../../database/models/userModel');
const bcrypt = require('bcryptjs');
require('linqjs');

const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  let user = await UserModel.findOne({ email });
  let userExists = [user];
  // LINQ - arr.first();
  if (userExists.first()) {
    res.status(400).json([{ message: 'User with this email already exists' }]);
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);

    user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    user
      .save()
      .then(() =>
        res.status(200).json([
          {
            message: 'Registered successfuly',
            redirectURL: 'http://localhost:3000/login',
          },
        ])
      )
      .catch((err) => res.status(400).json(err));
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  let userExists = [user];
  // LINQ - arr.first();
  if (!userExists.first()) {
    res.status(400).json([
      {
        message: 'No such user found',
      },
    ]);
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json([
        {
          message: 'Invalid Password',
        },
      ]);
    } else {
      req.session.isAuth = true;
      res.status(200).json([
        {
          message: 'Log in successful',
          userID: user._id,
          username: user.username,
          email: user.email,
          redirectURL: 'http://localhost:3000/',
        },
      ]);
    }
  }
};

const deleteUsersController = async (req, res) => {
  UserModel.deleteMany()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err.message));
};

const getUserInfoController = async (req, res) => {
  let userID = req.params.id;
  UserModel.findOne({ _id: userID })
    .then(({ username, email, createdAt }) =>
      res.status(200).json({ username, email, createdAt })
    )
    .catch((err) => res.status(400).json(err.message));
};

const updateUserController = async (req, res) => {
  let userID = req.params.id;
  let { username } = req.body;
  UserModel.findOneAndUpdate({ _id: userID }, { username })
    .then(({ username }) => res.status(200).json([{ username }]))
    .catch((err) => res.status(400).json(err.message));
};

module.exports = {
  registerUserController,
  deleteUsersController,
  loginUserController,
  getUserInfoController,
  updateUserController,
};
