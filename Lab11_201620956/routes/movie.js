const Movie = require('../models/movie');

var express = require('express');
var router = express.Router();

router.post('/routes/movie/create', function(req, res, next) {
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

router.post('/routes/movie/delete/:id', (req, res, next)=>{
  console.log(req.params.id);
  Movie.deleteOne({_id : req.params.id}).then((result)=>{
    var response = {
      success : true
    }
    res.status(200).json(response);
  }).catch((err)=>{
    var response = {
      success : false
    }    
    res.status(500).json(response);
  });
});

module.exports = router;
