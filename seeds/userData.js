const { User } = require('../models');

const userData = [
  {
    username: "user1",
    profile: "3 bedroom, 2 bath single family home with hardwood floors",
    password: "12345678",
    email: "user1@example.com",
    zipcode: "95008"
  },
  {
    username: "user2",
    profile: "2 bedroom condo with carpet and tile flooring",
    password: "12345678",
    email: "user2@example.com",
    zipcode: "94043"
  }
]

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;
