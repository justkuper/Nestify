const User = require('./User');
const Provider = require('./Provider');
const OpenTicket = require('./OpenTicket');
const ConfirmedTicket = require('./ConfirmedTicket');

User.hasMany(OpenTicket, {
  foreignKey: 'user_id',
  onDelete: "CASCADE",
});

OpenTicket.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(ConfirmedTicket, {
  foreignKey: 'user_id',
  onDelete: "CASCADE",
});

ConfirmedTicket.belongsTo(User, {
  foreignKey: 'user_id',
});

Provider.hasMany(ConfirmedTicket, {
  foreignKey: 'provider_id',
  onDelete: "CASCADE",
});

ConfirmedTicket.belongsTo(Provider, {
  foreignKey: 'provider_id',
});


module.exports = { User, Provider, OpenTicket, ConfirmedTicket };
