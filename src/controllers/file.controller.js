var stream = require('stream');
var fs = require('fs');

const db = require('../config/db.config.js');
const File = db.files;




exports.uploadFile = (req, res) => {
  console.log(req);
  File.create({
    type: 'multipart/form-data',
    name: req.file.originalname,
    filesize: req.file.size
  }).then(file => {
                console.log(file);
                const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successful!",
                        downloadUrl: "http://localhost:3000/api/file/" + file.dataValues.id,
                }

                res.json(result);
        }).catch(err => {
                console.log(err);

                const result = {
                        status: "error",
                        error: err
                }
                res.json(result);
        });

}

exports.listAllFiles = (req, res) => {
  File.findAll({attributes: ['id', 'name','times_downloaded']}).then(files => {
    res.json(files);
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
  });
}
exports.downloadFile = (req, res) => {
        File.findByPk(req.params.id).then(file => {


                console.log(file);

                var readStream = fs.createReadStream('uploads/'+file.name);


                res.set('Content-disposition', 'attachment; filename=' + file.name + '; size='+file.size);
                res.set('Content-Type', file.type);

                readStream.pipe(res);
                File.update({times_downloaded: file.times_downloaded+1}, { where: {id: req.params.id }}).then((result) => {
                  return result;
                  }).catch(e => {
                    console.log(e);
                });

        }).catch(err => {
                console.log(err);
                res.json({msg: 'Error', detail: err});
        });
}

