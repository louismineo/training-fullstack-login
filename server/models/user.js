'use strict';
const {
  Model
} = require('sequelize');
const department = require('./department');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*
      this.belongsTo(department)
      */
    }

    toJSON()
    {
      return {...this.get(), id:undefined, createdAt:undefined, updatedAt:undefined};
    }
  }
  User.init({
    username: 
    {
      type: DataTypes.STRING,
      allowNull:false,
      validate:
      {
        notNull:{msg:"User must have a username."},
        notEmpty:{msg:"Username cannot be empty."}
      }
    },
    password:
    {
      type: DataTypes.STRING,
      allowNull:false,
      validate:
      {
        notNull:{msg:"User must have a password."},
        notEmpty:{msg:"Password cannot be empty."}
      }
    },
    deptId:
    {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:
      {
        notNull:{msg:"User must have a deptId."},
        notEmpty:{msg:"deptId cannot be empty."},
        isIn:
        {
          args:[[1,2,3]],
          msg: "DeptId must be 1, 2 or 3"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};