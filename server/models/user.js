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
      unique:
      {
        msg:'Username already exists',
      },
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
        notEmpty:{msg:"Password cannot be empty."},
        isValidHash(value) {
          // Assume you expect an Argon2 hash that should be a Base64 string of a certain length
          const argon2HashRegex = /^\$argon2[a-z]+\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/;
          if (!argon2HashRegex.test(value)) {
            throw new Error('Invalid password hash format.');
          }
        }
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