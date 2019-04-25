const express = require("express");
const server = express();
const Posts = require("./userDb.js");
const db = require("./userDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
function capName(name) {
  return (req, res, next) => {
    const userName = req.headers.name;
    if (name.toUpperCase()) {
      next();
    } else {
      res.status(403).send("not uppercase");
    }
  };
}
server.use(capName);
router.get("/:id", (req, res) => {
  userId = req.params.id;
  db.findById(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
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

router.get("/:userId", (req, res) => {
  users
    .getUserId(req.params.userId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "there was an error" });
    });
});
router.post("/", (req, res) => {
  const newUser = req.body;
  console.log("request body: ", newUser);

  if (newUser) {
    db.insert(newPost)
      .then(posts => {
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

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const updateInfo = req.body;
  if (updateInfo.name && updateInfo.bio) {
    db.update(postId, updateInfo)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The post information could not be modified."
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }
});

module.exports = router;
