'use strict';
const {
  Model
} = require('sequelize');
const department = require('./department');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
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
      values:['Admin','PS','HR'],
      allowNull:false,
      validate:
      {
        notNull:{msg:"Employee must be allocated to a department."},
        notEmpty:{msg:"Department cannot be empty."},
        isIn:
        {
          args:[['Admin','PS','HR']],
          msg: "Department must be either 'PS' or 'HR'"
        }
      }
    },
    deptId:
    {
      type:DataTypes.INTEGER,
      values:[1,2,3],
      allowNull:false,
      validate:
      {
        notNull:{msg:"Employee must be allocated to a deptId."},
        notEmpty:{msg:"deptId cannot be empty."},
        isIn:
        {
          args:[[1,2,3]],
          msg: "deptId must be either 1, 2 or 3"
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