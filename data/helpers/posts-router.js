const express = require("express");

const Posts = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      console.log(posts);
      res.status(201).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  postId = req.params.id;
  db.findById(postId)
    .then(user => {
      if (posts) {
        res.status(200).json(posts);
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

router.post("/", (req, res) => {
  const newPost = req.body;
  console.log("request body: ", newPost);

  if (newPost) {
    db.insert(newPost)
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch(err => {
        res
          .status(400)
          .json({
            errorMessage: "Please provide title and contents for the post."
          });
      });
  } else {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const updateInfo = req.body;
  if (updateInfo.name && updateInfo.bio) {
    db.update(postId, updateInfo)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res
          .status(500)
          .json({
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
