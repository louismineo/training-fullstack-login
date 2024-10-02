'use strict';

const argon2 = require('argon2') 

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

      await queryInterface.bulkInsert('users', [
      {
        username: 'Admin',
        password: await argon2.hash('admin'),
        deptId: 1,
        createdAt:'2024-10-01 14:18:28.499+08',
        updatedAt:'2024-10-01 14:18:28.499+08'
      },
      {
        username: 'PS_person',
        password: await argon2.hash('professionalservices'),
        deptId: 2,
        createdAt:'2024-10-01 14:18:28.499+08',
        updatedAt:'2024-10-01 14:18:28.499+08'
      },
      {
        username: 'HR_person',
        password: await argon2.hash('humanresources'),
        deptId: 3,
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
