'use strict';
var express = require('express');
var router = express.Router();
var jimp = require('jimp');
let img;

router.post('/', (req, res, next) => {
  img = req.body.postImage;
  let type;
  const url = img.replace(/^data:image\/\w+;base64,/, "");
  const buffer = new Buffer(url, 'base64');
  req.body.type === 'png' ? type = jimp.MIME_PNG : type = jimp.MIME_JPEG;
  jimp.read(buffer, (err, image) => {
    image.resize(Number(req.body.x), Number(req.body.y))
      .quality(100)
      .getBase64(type, (err, src) => {
        img = src;
      });
  });
  img = null;
  req.body.postImage = null;
});

router.get('/', (req, res, next) => {
  res.send(img)
});

module.exports = router;