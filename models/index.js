// Import the User model
const User = require('./User');

// Import the Provider model
const Provider = require('./Provider');

// Import the Ticket model
const Ticket = require('./Ticket');

// Define a one-to-many relationship between User and Ticket
// A user can have multiple tickets
User.hasMany(Ticket, {
  foreignKey: 'user_id', // Specifies the foreign key in the Ticket model that references the User model
});

// Define the inverse relationship, where a ticket belongs to a user
Ticket.belongsTo(User, {
  foreignKey: 'user_id', // Specifies the foreign key in the Ticket model that references the User model
});

// Define a one-to-many relationship between Provider and Ticket
// A provider can have multiple tickets
Provider.hasMany(Ticket, {
  foreignKey: 'provider_id', // Specifies the foreign key in the Ticket model that references the Provider model
});

// Define the inverse relationship, where a ticket belongs to a provider
Ticket.belongsTo(Provider, {
  foreignKey: 'provider_id', // Specifies the foreign key in the Ticket model that references the Provider model
});

// Export the models so they can be used in other parts of the application
module.exports = { User, Provider, Ticket };