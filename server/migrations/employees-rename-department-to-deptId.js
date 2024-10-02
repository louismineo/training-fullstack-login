'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

    async up(queryInterface, Sequelize)
    {

        await queryInterface.addColumn('employees', 'deptId', {
            type: Sequelize.INTEGER,
            allowNull: true, // Initially, we can allow NULL
        });
        
        //update that column to get the new deptId values
        await queryInterface.sequelize.query(
            `
            UPDATE employees
            SET "deptId" = (
                SELECT "deptId"
                FROM departments
                WHERE employees.department = departments.name
            )
            WHERE EXISTS (
                SELECT 1
                FROM departments
                WHERE employees.department = departments.name
            );         
            `
        )
        
    },

    async down(queryInterface, Sequelize)
    {
        //remove the column
        //await queryInterface.removeColumn('employees', 'deptId');
    }

}