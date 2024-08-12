const { Provider } = require("../models");

const providerData = [
  {
    username: "provider1",
    profile: "5 years experience, specializes in deep cleaning and organizing",
    password: "12345678",
    email: "provider1@example.com",
    zipcode: "95014",
  },
  {
    username: "provider2",
    profile:
      "3 years experience, eco-friendly cleaning products, excellent with pets",
    password: "12345678",
    email: "provider2@example.com",
    zipcode: "94306",
  },
];

// * This function will bulk create the seed data for the providers
const seedProviders = () =>
  Provider.bulkCreate(providerData, { individualHooks: true });

module.exports = seedProviders;
