const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedProviders = require("./providerData");
const seedTickets = require("./ticketData");

// * This file will run all of the seed files in the seeds folder
// * running seeds will clear the database and add the seed data
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedProviders();
  await seedTickets();

  process.exit(0);
};

seedAll();
