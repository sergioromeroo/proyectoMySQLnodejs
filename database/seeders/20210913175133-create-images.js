'use strict';

const imagenes = ['buzos.jpg','buzos2.jpg','camperas.jpg','camperas2.jpg','pantalones.jpg','pantalones2.jpg','calzados.jpg','calzados2.jpg','remeras.jpg','remeras2.jpg','camisas.jpg','camisas2.jpg'];

const images = [];

for (let i = 0; i < 180; i++) {
  var image = {
    file : imagenes[Math.floor(Math.random() * (11 - 0)) + 0],
    productId : i + 1,
    createdAt : new Date,
    updatedAt : new Date
  }
  images.push(image)
}




module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Images',images, {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Images', null, {});
     
  }
};
