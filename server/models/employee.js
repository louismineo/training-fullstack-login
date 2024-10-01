'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON()
    {
      return {...this.get(), id:undefined, createdAt:undefined, updatedAt:undefined};
    }
  }
  Employee.init({
    uuid:
    {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    name:
    {
      type:DataTypes.STRING,
      allowNull:false,
      validate:
      {
        notNull:{msg:"Employee must have a name."},
        notEmpty:{msg:"Name cannot be empty."}
      }
    }, 
    salary:
    {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:
      {
        notNull:{msg:"Employee must have a salary."},
        notEmpty:{msg:"Name cannot be empty."}
      }
    },
    department:
    {
      type:DataTypes.ENUM,
      values:['PS','HR'],
      allowNull:false,
      validate:
      {
        notNull:{msg:"Employee must be allocated to a department."},
        notEmpty:{msg:"Department cannot be empty."},
        isIn:
        {
          args:[['PS','HR']],
          msg: "Department must be either 'PS' or 'HR'"
        }
      }
    } 
  }, {
    sequelize,
    tableName: 'employees',
    modelName: 'Employee',
  });
  return Employee;
};