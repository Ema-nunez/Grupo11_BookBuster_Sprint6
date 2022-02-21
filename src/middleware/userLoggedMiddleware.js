const User = require("../data/users.json");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  let emailCookie = req.cookies.userEmail;
  let userCookie = User.find((user) => user.email === emailCookie);
  if (userCookie) {
    req.session.userLoged = userCookie;
  }
  if (req.session && req.session.userLoged) {
    res.locals.isLogged = true;
    res.locals.userLoged = req.session.userLoged;
  }

  next();
}

module.exports = userLoggedMiddleware;
