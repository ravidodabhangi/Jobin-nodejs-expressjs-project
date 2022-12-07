let multer = require('multer')

let storage = multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, 'public/profile_img')
    },
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname)
    } 
  })

module.exports = storage
