'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Comments', 'LocationId', 'locationId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Comments', 'locationId', 'LocationId');
  }
};
