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

    await queryInterface.bulkInsert('employees', [
      {
        uuid: "916dd56d-58c5-4086-b391-044174549d12",
        name: "Albert",
        salary: 3000,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "2c25f9fd-4cfa-4dd0-b01d-478922864fc4",
        name: "Benny",
        salary: 4111,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "e2a8e84e-bd5b-4220-a70d-b5787ccd9df4",
        name: "Charlie",
        salary: 5222,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "2a6d04a5-46cb-49d7-831b-929c6dde89cc",
        name: "David",
        salary: 6333,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "d9e02df2-53a8-4d83-acf8-e490f94957f4",
        name: "Ella",
        salary: 7444,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "00fc7e62-d467-4204-a852-75e4b22047d0",
        name: "Fiona",
        salary: 3000,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "7f12552b-55d1-44ed-9dd0-a938e9a15a45",
        name: "George",
        salary: 4111,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "4a438962-cebc-405a-877e-2ab471347174",
        name: "Helen",
        salary: 5222,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "8ef42a73-71b5-4fb5-9d84-18d1bc89b2ea",
        name: "Isaac",
        salary: 6333,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "6a36b90b-e9f2-490e-9fef-d124357c01e5",
        name: "Jack",
        salary: 7444,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "fde92dba-b800-48b1-9e39-90cc40d6ad22",
        name: "Kevin",
        salary: 3000,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "b3c29fa8-b8cd-4f7e-afd2-768e63f97fd5",
        name: "Lucas",
        salary: 4111,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "342c7f4c-a50f-4afa-9b59-9e9ea6cc3d5f",
        name: "Mike",
        salary: 5222,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "7fd630d2-ad8c-4fa2-b8de-9b02775921e9",
        name: "Nancy",
        salary: 6333,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "671c2293-ae1e-4e60-a745-9677b8a24ae9",
        name: "Olivia",
        salary: 7444,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "7f72f52d-f87e-4827-8967-c650f86eebb8",
        name: "Paul",
        salary: 3000,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "6857886f-136a-46d7-804c-5203b3079480",
        name: "Quincy",
        salary: 4111,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "6acdbcaa-1581-45aa-a222-6365f7eb5044",
        name: "Rachel",
        salary: 5222,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "5161ed10-8833-46ee-bf11-87e14812cff4",
        name: "Sarah",
        salary: 6333,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "ae3aa0ae-26bf-42fc-aae0-06c865cd8f90",
        name: "Tom",
        salary: 7444,
        department: "HR",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
    },
    {
        uuid: "2575e04c-0a38-4dc7-9917-baf4ad40a086",
        name: "Uma",
        salary: 3000,
        department: "PS",
        createdAt:'2024-09-11 14:18:28.499+08',
        updatedAt:'2024-09-11 14:18:28.499+08'
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
