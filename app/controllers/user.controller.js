
exports.allAccess = (req, res) => {
  res.status(200).sendFile("C:/Users/HP/Desktop/gcc/Github/node-js-jwt-auth-mongodb/app/static/about.html");
};

exports.userBoard = (req, res) => {
  res.status(200).render("user");
};
exports.login = (req, res) => {
  res.status(200).render("login");
};
exports.dashBoard = (req,res) => {
  res.status(200).render("dashboard")
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.signUp = (req, res) => {
  res.status(200).send("signup page");
};
/* exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
 */