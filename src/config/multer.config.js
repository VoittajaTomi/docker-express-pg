const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname  + '.file');
    console.log('22222222222222222222222222222222222222222222');
  }
});

//var storage = multer.memoryStorage()
var upload = multer({storage: storage});
module.exports = upload;
