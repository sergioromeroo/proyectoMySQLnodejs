'use strict';

const imagenes = ['img-01.jpg','img-02.jpg','img-12.jpg','login-bg.jpg','register-bg.jpg','register-bg.jpg'];

const images = [];

for (let i = 0; i < 36; i++) {
  var image = {
    file : imagenes[Math.floor(Math.random() * (5 - 0)) + 0],
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
