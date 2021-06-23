function signin(req, res) {
    res.render("signin");
  }
  function signup(req, res) {
    res.render("signup");
  }
  module.exports = {
    signin: signin,
    signup: signup,
  };
  