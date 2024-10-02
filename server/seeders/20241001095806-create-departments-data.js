'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('departments', [
      {
        deptId: 1,
        name: 'Admin',
        createdAt:'2024-10-01 14:18:28.499+08',
        updatedAt:'2024-10-01 14:18:28.499+08'
      },
      {
        deptId: 2,
        name: 'PS',
        createdAt:'2024-10-01 14:18:28.499+08',
        updatedAt:'2024-10-01 14:18:28.499+08'
      },
      {
        deptId: 3,
        name: 'HR',
        createdAt:'2024-10-01 14:18:28.499+08',
        updatedAt:'2024-10-01 14:18:28.499+08'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
