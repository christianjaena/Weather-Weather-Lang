const UserModel = require('../../database/models/userModel');
const bcrypt = require('bcryptjs');

const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  let user = await UserModel.findOne({ email });
  if (user) {
    res.redirect('/register');
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);

    user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    user
      .save()
      .then((result) => res.redirect('/login'))
      .catch((err) => res.status(400).json(err.message));
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    res.redirect('/login');
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.redirect('/');
    } else {
      req.session.isAuth = true;
      console.log(user.username, user.email);
      res.status(200).json({
        userID: user._id,
        username: user.username,
        email: user.email,
        url: 'http://localhost:3000/',
      });
    }
  }
};

const deleteUsersController = async (req, res) => {
  UserModel.deleteMany()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

module.exports = {
  registerUserController,
  deleteUsersController,
  loginUserController,
};
