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

module.exports = router;