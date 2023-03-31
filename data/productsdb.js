const fs = require ('fs');
const path = require('path')//requiero esto para enrutar ruta absoluta path.join __dirname

//parseo el json para q sea legible en json 
module.exports = {
productosdb : JSON.parse(fs.readFileSync(path.join(__dirname,'products.json'),'utf-8')),
guardar : data => fs.writeFileSync(path.join(__dirname,'products.json'),JSON.stringify(data,null,2),'utf-8'),

}