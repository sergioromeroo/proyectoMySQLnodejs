const fs = require ('fs');
const path = require('path')//requiero esto para enrutar ruta absoluta path.join __dirname

//parseo el json para q sea legible en json 
module.exports = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/categories.json'),'utf-8',));