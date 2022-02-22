
const db = require('../database/models')

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  if(req.session && req.session.userLoged){
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLoged;
  }
  next();
}

module.exports = userLoggedMiddleware;
