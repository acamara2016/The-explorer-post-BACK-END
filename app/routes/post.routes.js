const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");
const db = require("../models");
const Post = db.post;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/post/all",
    controller.all
  );
  app.post(
    "/api/post/add",
    controller.add
  );
  app.get("/api/post/:id", function(req, res){
        const {id} = req.params;
        Post.find({"_id":id})
        .exec()
        .then(data=>{
            console.log(data);
            res.status(200).json(data)
        })
        .catch(err=>{console.log(err);})
    }
  );
  app.get("/api/post/users/:id", function(req, res){
    const {id} = req.params;
    Post.find({"authorId":id})
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json(data)
    })
    .catch(err=>{console.log(err);})
}
);

};
