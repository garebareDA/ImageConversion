'use strict';
var express = require('express');
var router = express.Router();
var jimp = require('jimp');
let imgSrc;

router.post('/', (req, res, next) => {
  const img = req.body.postImage;
  const url = img.replace(/^data:image\/\w+;base64,/, "");
  const buffer = new Buffer(url, 'base64');
  let type;
  req.body.type === 'png' ? type = jimp.MIME_PNG : type = jimp.MIME_JPEG;
  jimp.read(buffer, (err, image) => {
    image.resize(Number(req.body.x), Number(req.body.y))
      .quality(100)
      .getBase64(type, (err, src) => {
        imgSrc = src;
      });
  });
  res.redirect('/')
});

router.get('/', (req, res, next) => {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.write(`<img src="${imgSrc}">`);
});

module.exports = router;