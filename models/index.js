const User = require('./User');
const Provider = require('./Provider');
const Ticket = require('./Ticket');

User.hasMany(Ticket, {
  foreignKey: 'user_id',
});

Ticket.belongsTo(User, {
  foreignKey: 'user_id',
});

Provider.hasMany(Ticket, {
  foreignKey: 'provider_id',
});

Ticket.belongsTo(Provider, {
  foreignKey: 'provider_id',
});


module.exports = { User, Provider, Ticket };
