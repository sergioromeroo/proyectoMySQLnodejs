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
        callback(null,'public/img')
    },
    filename : (req,file,callback) => {//y de que manera se guarda
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})

const {add,detail,search, save, edit, update, destroy, products} = require('../controllers/productsController');



router.get('/add',adminUserCheck,add);
//post enviar datos al formulario de addproduct
router.post('/add',upload.single('imagen'),addProductValidator,save)
router.get('/detail/:id',detail)
router.get('/edit/:id',edit)
router.put('/edit/:id',update)
router.get('/search',search)
router.get('/productos', products)

router.delete('/delete/:id',destroy)




module.exports = router;