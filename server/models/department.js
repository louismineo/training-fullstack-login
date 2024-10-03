'use strict';
const {
  Model
} = require('sequelize');
const employee = require('./employee');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      /*
      this.hasMany(employee,
        {
          foreignKey:'',
          sourceKey:'deptId'
        }
      )
      this.hasMany(user,
        {
          foreignKey:'',
          sourceKey:'deptId'
        }
      )
      */
    }
  }
  Department.init({
    deptId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
  });
  return Department;
};