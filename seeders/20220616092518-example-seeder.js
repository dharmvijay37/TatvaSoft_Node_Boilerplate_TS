"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
     return await queryInterface.bulkInsert("example", [
      {
        name: "Joe doe",
        price: "24",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("example", null, {});
  },
};
