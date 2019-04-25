const express = require("express");
const db = require("./postDb.js");
const posts = require("./postDb.js");

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  db
  .get()
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

postRouter.get("/:id", (req, res) => {
  postId = req.params.id;
  db.getById(postId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

postRouter.post("/:id", (req, res) => {
  const newPost = req.body;

  if (newPost.text && newPost.user_id) {
    db.insert(newPost)
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch(err => {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      });
  } else {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

postRouter.delete("/:id", (req, res) => {
  const postId = req.params.id;
  db.remove(postId)
    .then(deleted => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The post could not be removed"
      });
    });
});

postRouter.put("/:id", (req, res) => {
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

module.exports = postRouter;
