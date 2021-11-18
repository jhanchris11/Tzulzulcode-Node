const multer = require('multer')
const shortid = require('shortid')
const configMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '../../uploads/') //almacena en uploads
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1]
      cb(null, `${shortid.generate()}.${extension}`) //generamos con la extension
    }
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('Formato No válido'))
    }
  }
}
module.exports = configMulter
