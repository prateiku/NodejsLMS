const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const usercontroller = require("../controllers/user.controller");
const path = require("path");



module.exports = function(app) {
  app.set('views', "C:\\Users\\HP\\Desktop\\gcc\\Github\\node-js-jwt-auth-mongodb\\app\\views");
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],controller.signup
  )

  app.post("/api/auth/login", controller.signin)
};
