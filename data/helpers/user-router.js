const express = require("express");
const server = express();
const users = require("./userDb.js");
const db = require("./userDb.js");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
// function capName(name) {
//   return (req, res, next) => {
//     const userName = req.headers.name;
//     if (name.toUpperCase()) {
//       next();
//     } else {
//       res.status(403).send("not uppercase");
//     }
//   };
// }
// userRouter.use(capName);

userRouter.get("/:id", (req, res) => {
  userId = req.params.id;
  db.getById(userId)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

userRouter.get("/:userId", (req, res) => {
  users
    .getUserPosts(req.params.userId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "there was an error" });
    });
});
userRouter.post("/", (req, res) => {
  const newUser = req.body;
  console.log("request body: ", newUser);

  if (newUser.text && newUser.user_id) {
    db.insert(newPost)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      });
  } else {
    res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

userRouter.delete("/:id", (req, res) => {
  const postId = req.params.id;
  db.remove(postId)
    .then(deleted => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The user could not be removed"
      });
    });
});

userRouter.put("/:id", (req, res) => {
  const postId = req.params.id;
  const updateInfo = req.body;
  if (updateInfo.name ) {
    db.update(postId, updateInfo)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The user information could not be modified."
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a name for the user." });
  }
});

module.exports = userRouter;
