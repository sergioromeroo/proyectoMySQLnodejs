const multer = require('multer')//usado para addproduct enviar img trabaja con datos o archivos
const path = require('path')

//configurar multer para q funcione
const storage = multer.diskStorage({
    destination : (req,file,callback) => {//donde se guarda
        callback(null,'public/images/avatar')
    },
    filename : (req,file,callback) => {//y de que manera se guarda
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})

module.exports = upload