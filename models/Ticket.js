const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ticket extends Model {}

Ticket.init(
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true, 
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    provider_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'providers',
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

module.exports = Ticket;
