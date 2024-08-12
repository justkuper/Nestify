// Import the Model and DataTypes classes from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import bcrypt for password hashing and comparison
const bcrypt = require('bcrypt');

// Import the configured Sequelize instance
const sequelize = require('../config/connection');

// Define the User class that extends the Sequelize Model class
class User extends Model {
  // Method to compare the provided login password with the stored hashed password
  async checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its fields and configuration
User.init(
  {
    // Define the id field, which will be the primary key
    id: {
      type: DataTypes.INTEGER,         // Data type: Integer
      allowNull: false,                // Cannot be null
      primaryKey: true,                // Primary key for the model
      autoIncrement: true,             // Auto-incrementing ID
    },
    // Define the username field
    username: {
      type: DataTypes.STRING,          // Data type: String
      allowNull: false,                // Cannot be null
      unique: true,                    // Must be unique
      validate: {
        isAlphanumeric: true,          // Only alphanumeric characters allowed
        notEmpty: true,                // Cannot be empty
      },
    },
    // Define the profile field
    profile: {
      type: DataTypes.STRING,          // Data type: String
      allowNull: false,                // Cannot be null
      validate: {
        notEmpty: true,                // Cannot be empty
      },
    },
    // Define the password field
    password: {
      type: DataTypes.STRING,          // Data type: String
      allowNull: false,                // Cannot be null
      validate: {
        len: [6],                      // Must be at least 6 characters long
        notEmpty: true,                // Cannot be empty
      },
    },
    // Define the email field
    email: {
      type: DataTypes.STRING,          // Data type: String
      allowNull: false,                // Cannot be null
      validate: {
        isEmail: true,                 // Must be a valid email format
        notEmpty: true,                // Cannot be empty
      },
    },
    // Define the zipcode field
    zipcode: {
      type: DataTypes.STRING,          // Data type: String
      allowNull: false,                // Cannot be null
      validate: {
        len: [5,5],                    // Must be exactly 5 characters long
        notEmpty: true,                // Cannot be empty
      },
    },
  },
  {
    // Define hooks for the model, specifically a hook to hash the password before creating a new user
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash password with bcrypt
        return newUserData;
      },
    },
    sequelize,                         // Pass the Sequelize instance
    timestamps: false,                 // Disable automatic timestamps (createdAt, updatedAt)
    underscored: true,                 // Use underscored column names in the database
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
