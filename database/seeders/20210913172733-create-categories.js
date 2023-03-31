'use strict';

const faker = require('faker');
const categorias = ['buzos','camperas','pantalones','calzados','remeras','camisas'];

const categories = [];

categorias.forEach(categoria => {
  var category = {
    name : categoria,
    description : faker.commerce.productDescription(),
    createdAt : new Date,
    updatedAt : new Date
  }
  categories.push(category)
});


module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Categories',categories, {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
