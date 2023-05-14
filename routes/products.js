var express = require('express');
var router = express.Router();
const multer = require('multer')//usado para addproduct enviar img trabaja con datos o archivos
const path = require('path')

const addProductValidator = require('../validations/addProductValidator')

/* middlewares */
const adminUserCheck = require('../middlewares/adminUserCheck');

//configurar multer para q funcione
const storage = multer.diskStorage({
    destination : (req,file,callback) => {//donde se guarda
        callback(null,'public/img/ropa')
    },
    filename : (req,file,callback) => {//y de que manera se guarda
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})

const {detail,search, save, edit, update, destroy, products, admin, add} = require('../controllers/productsController');



//post enviar datos al formulario de addproduct
router.get('/add',adminUserCheck,add)
router.post('/add',upload.array("images"),addProductValidator,save)
router.get('/detail/:id',detail)
router.get('/edit/:id',edit)
router.put('/edit/:id',update)
router.get('/search',search)
router.get('/productos', products)

router.get('/admin',admin)
router.delete('/delete/:id',destroy)




module.exports = router;