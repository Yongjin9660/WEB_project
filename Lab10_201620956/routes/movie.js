const Movie = require('../models/movie');

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var post = req.body;
  const movie = new Movie({
    title : post.title,
    year : post.year,
    url : post.url
  });
  movie.save((err)=>{
    res.redirect('/');
  });
});

module.exports = router;
