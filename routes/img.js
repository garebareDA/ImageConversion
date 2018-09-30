'use strict';
var express = require('express');
var router = express.Router();
var jimp = require('jimp');

let img;

router.post('/', (req, res, next) => {
  img = req.body.postImage;
  console.log(req.body)
  let url = img.replace(/^data:image\/\w+;base64,/, "");
  let buffer = new Buffer(url, 'base64');
  let type
  req.body.type === 'png' ? type = jimp.MIME_PNG : type = jimp.MIME_JPEG

  console.log(req.body.x);
  console.log(req.body.y);
  

  jimp.read(buffer, (err, image) => {
    image.resize(Number(req.body.x), Number(req.body.y))
      .quality(100)
      .getBase64(type, (err, src) => {
        img = src;
      });

  });

  res.redirect('/');
  res.end();
});

router.get('/', (req, res, next) => {
  res.send(img);
});

module.exports = router;