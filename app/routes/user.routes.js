const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const db = require("../models");
const User = db.user;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/users", function(req, res) {
    User.find()
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json(data)
    })
    .catch(err=>{console.log(err);})
  });
  app.get("/api/user/:id", function(req, res) {
    const {id} = req.params;
    User.find({"username":id})
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json(data)
    })
    .catch(err=>{console.log(err);})
  });
  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
