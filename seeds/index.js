const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedProviders = require('./providerData');
const seedTickets = require('./ticketData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedProviders();
  await seedTickets();

  process.exit(0);
};

seedAll();
