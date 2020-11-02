var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

function loadImage(path){
  return new Promise((resolve, reject) => {
    fs.stat(path, function(err, stats){
      if(err){
        reject(err);
      }
      else{
        resolve(stats);
      }
    });
  });
}

router.post('/', function(req, res) {
  var post = req.body;
  var tempUrl = post.url;
  var imagePath = path.join(__dirname, '../public', tempUrl);
  
  loadImage(imagePath).then(function(){
    res.render('result', {movie_title : post.title, cast : post.cast, genre : post.genre, url:post.url, score:post.score});
  });
});

module.exports = router;