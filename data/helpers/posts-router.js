const express = require('express')

const Posts = require('./postDb.js')

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
    userId = req.params.id;
    db.findById(userId)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: "The user with the specified ID does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved" });
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
            .json({ errorMessage:  "Please provide title and contents for the post."  });
        });
    } else {
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database" 
        });
    }
  });

  router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    db.posts
    .remove(postId)
    .then(deleted => {
        res.status(404)
        message: "The post with the specified ID does not exist."
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The post could not be removed" 
        });
      });
  });
  
  router.put("/:id", (req, res) => {
    const userId = req.params.id;
    const updateInfo = req.body
    if (updateInfo.name && updateInfo.bio) {
      db.update(userId, updateInfo)
        .then(user => {
         res.status(200).json(user)
        })
        .catch(err => {
          res.status(500).json({error: err, message: "there was an error updating the user"})
        })
      } else {
        res.status(400).json({message: "please provide a name and bio"})
      }
  
  })
  
module.exports = router;