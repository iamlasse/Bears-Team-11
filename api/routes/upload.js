var express = require('express');

var  multer = require('multer');
var  multerS3 = require('multer-s3');
// credentials from aws
var aws_secret = require('../utils/s3_config.json');
var router = express.Router();
var AWS = require('aws-sdk');

AWS.config.update(aws_secret);
var s3 = new AWS.S3();

/**
 * FOR USER
 */
// Saves image to the /profile folder in the 'project-match' bucket
// usage is post to /api/upload/profile?fileName=USERNAME
// Html form should contain the image key "profile"
router.post('/profile', function (req,res) {
  
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/profile',
      key: function (req,file,callback) {
        
        console.log("The file location is " + file.location);
        callback(null,req.query.fileName+'.jpg');
      }
    })
  });

  var uploadingHandler = upload.single('profile');
  uploadingHandler(req,res,function (err) {
    if(err){
      // file not uploaded to aws
      console.log(err);
    }else{
      console.log("succeefully uploaded");
      
      res.send("successfully uploaded");
    }
  })
});

/**
 * FOR PROJECT
 */
// Saves MULTIPLE images to the /project folder in the 'project-match' bucket
// usage is post to /api/upload/project?projectId=PROJECTID
// Html form should contain the image key "projectImages"
router.post('/project', function (req,res) {

  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/project/' + req.query.projectId,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  });

  // .array uploads multiple images
  var uploadingHandler = upload.array('projectImages');

  uploadingHandler( req , res,function (err) {

    //console.log("uploading requestis ", req.files);
    if(err){
      // files are not uploaded to aws
      console.log(err);
      
    }else{
      console.log("succeefully uploaded");
      
      res.send("successfully uploaded");
    }
  })
});

module.exports = router;


