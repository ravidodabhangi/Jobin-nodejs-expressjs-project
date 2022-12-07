let multer = require('multer')

let storagePost = multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, 'public/profile_img')
    },
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname)
    } 
  })

module.exports = storagePost