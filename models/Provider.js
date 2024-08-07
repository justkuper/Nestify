const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Provider extends Model {
  async checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Provider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, 
        notEmpty: true,
      },
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,5],
        notEmpty: true,
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newProviderData) {
        newProviderData.password = await bcrypt.hash(newProviderData.password, 10);
        return newProviderData;
      },
    },
    sequelize,
    timestamps: false,
    underscored: true,
  }
);

module.exports = Provider;
