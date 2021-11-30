const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/about", controller.allAccess);
  app.get("/api/auth/login", controller.login);
  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/dashboard",[authJwt.verifyToken], controller.dashBoard);
  app.get("/api/auth/signup",[authJwt.verifyToken, authJwt.isAdmin],controller.signUp);
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
 /* app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  ); */
