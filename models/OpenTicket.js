const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OpenTicket extends Model {}

OpenTicket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pay: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 200.00,
      validate: {
        isDecimal: true,
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true, 
      },
    },
    confirmed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Provider;
