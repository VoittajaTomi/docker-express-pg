let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

const fileWorker = require('../controllers/file.controller.js');

let path = __basedir + '/views/';

router.get('/', (req,res) => {
     console.log('kakka perse');
    res.sendFile(path + "index.html");
});

router.post('/api/file/upload', upload.single("file"), fileWorker.uploadFile);

router.get('/api/file/info', fileWorker.listAllFiles);

router.get('/api/file/:id', fileWorker.downloadFile);

module.exports = router;
