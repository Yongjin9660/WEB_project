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
  var url = post.url;
  //console.log(url);
  var newPath = path.join('./public', url);
  console.log(newPath);

  //const data = loadImage(newPath);
  //console.log(data);

  loadImage(newPath).then(function(){
    res.render('result', {title : post.title, cast : post.cast, genre : post.genre, url:newPath});
  });
});

module.exports = router;