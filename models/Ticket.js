// Import the Model and DataTypes classes from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the configured Sequelize instance
const sequelize = require('../config/connection');

// Define the Ticket class that extends the Sequelize Model class
class Ticket extends Model {}

// Initialize the Ticket model with its fields and configuration
Ticket.init(
  {
    // Define the id field, which will be the primary key
    id: {
      type: DataTypes.INTEGER,         // Data type: Integer
      allowNull: false,                // Cannot be null
      primaryKey: true,                // Primary key for the model
      autoIncrement: true,             // Auto-incrementing ID
    },
    // Define the description field
    description: {
      type: DataTypes.STRING,          // Data type: String
      allowNull: false,                // Cannot be null
      validate: {
        notEmpty: true,                // Cannot be empty
      },
    },
    // Define the pay field
    pay: {
      type: DataTypes.DECIMAL,         // Data type: Decimal (for monetary values)
      allowNull: false,                // Cannot be null
      defaultValue: 200.00,            // Default value set to 200.00
      validate: {
        isDecimal: true,               // Must be a decimal value
      },
    },
    // Define the date field
    date: {
      type: DataTypes.STRING,          // Data type: String (could be DATE type instead)
      allowNull: false,                // Cannot be null
      validate: {
        isDate: true,                  // Must be a valid date format
      },
    },
    // Define the user_id field with a foreign key reference to the User model
    user_id: {
      type: DataTypes.INTEGER,         // Data type: Integer
      references: {
        model: 'users',                // References the 'users' table
        key: 'id',                     // References the 'id' column in the 'users' table
      },
    },
    // Define the provider_id field with a foreign key reference to the Provider model
    provider_id: {
      type: DataTypes.INTEGER,         // Data type: Integer
      references: {
        model: 'providers',            // References the 'providers' table
        key: 'id',                     // References the 'id' column in the 'providers' table
      },
    },
  },
  {
    sequelize,                         // Pass the Sequelize instance
    timestamps: true,                  // Enable automatic timestamps (createdAt, updatedAt)
    underscored: true,                 // Use underscored column names in the database
  }
);

// Export the Ticket model for use in other parts of the application
module.exports = Ticket;
