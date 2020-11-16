const Movie = require('../models/movie');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  Movie.find({}).then((movies)=>{
    res.render('index', {movies : movies, movie2 : movies});
  }).catch((err)=>{
    console.log(err);
  })
});

router.get('/newmovie', function(req, res, next) {
  res.render('newmovie');
});

router.get('/admin', function(req, res, next){
  Movie.find({}).then((movie)=>{
    res.render('admin', {movies : movie});
  }).catch((err)=>{
    console.log(err);
  })
});

router.get('/editfile', function(req, res, next){
  res.render('editfile');
});

module.exports = router;


