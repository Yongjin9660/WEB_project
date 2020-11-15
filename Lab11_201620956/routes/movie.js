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

router.get('/routes/movie/read/:id', (req, res, next)=>{
  Movie.findById(req.params.id, function(err, data){
    res.render('editfile', {title : data.title, year : data.year, url : data.url, id : req.params.id});
  })
});

router.post('/routes/movie/update/:id', (req, res, next)=>{
  let post = req.body;
  console.log(post.title);
  if (post.title == undefined) {
    console.log('trending!');
    Movie.findById(req.params.id).then(function (data) {
      if (data.trending === false) {
        Movie.findByIdAndUpdate(req.params.id, { trending: true }, function (err, result) {
          if (err) {
            let data = {
              success: false
            }
            res.status(500).json(data);
          }
          else {
            let data = {
              success: true,
              movie: result
            }
            res.status(200).json(data);
          }
        });
      }
      else {
        Movie.findByIdAndUpdate(req.params.id, { trending: false }, function (err, result) {
          if (err) {
            let data = {
              success: false
            }
            res.status(500).json(data);
          } else {
            let data = {
              success: true,
              movie: result
            }
            res.status(200).json(data);
          }
        });
      }
    });
  }
  else {
    Movie.findByIdAndUpdate(req.params.id, { title: post.title, year: post.year, url: post.url }, function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        res.redirect('/admin');
      }
    });
  }
});

module.exports = router;
