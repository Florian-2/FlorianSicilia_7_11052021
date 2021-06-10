'use strict';

const e = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_isAdmin: { // 0 : utilisateur classique, 1 : Admin
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      user_photo: { // Photo de l'utilisateur
        allowNull: true,
        defaultValue: "http://localhost:3001/images/tabasco.jpg",
        type: Sequelize.STRING
      },
      user_email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      user_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};