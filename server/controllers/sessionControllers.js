const authUserController = async (req, res) => {
  if (!req.session.isAuth) {
    res.redirect('/login');
  }
};

const logoutUserController = async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
};

module.exports = {
  authUserController,
  logoutUserController,
};
