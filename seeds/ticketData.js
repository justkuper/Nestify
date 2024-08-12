const { Ticket } = require("../models");

const ticketData = [
  {
    description:
      "Deep clean kitchen and bathrooms, including baseboards and inside appliances.",
    pay: 150.0,
    date: "2024-08-10",
    user_id: 1,
  },
  {
    description:
      "Standard cleaning of living room and bedrooms, including dusting and vacuuming.",
    pay: 225.0,
    date: "2024-08-09",
    user_id: 2,
  },
  {
    description:
      "Move-out cleaning: full house cleaning with window washing and floor mopping.",
    pay: 300.0,
    date: "2024-08-13",
    user_id: 1,
  },
  {
    description: "One-time cleaning of entire house after a party.",
    pay: 280.0,
    date: "2024-08-03",
    user_id: 1,
    provider_id: 1,
  },
  {
    description:
      "Weekly cleaning of common areas: living room, kitchen, hallways.",
    pay: 180.0,
    date: "2024-07-30",
    user_id: 2,
    provider_id: 2,
  },
  {
    description:
      "Bi-weekly cleaning with focus on kitchen and bathroom sanitization.",
    pay: 210.0,
    date: "2024-07-17",
    user_id: 1,
    provider_id: 1,
  },
  {
    description: "Monthly deep clean of carpets and upholstery in all rooms.",
    pay: 350.0,
    date: "2024-07-12",
    user_id: 2,
    provider_id: 2,
  },
  {
    description:
      "Office cleaning: desks, common areas, kitchen, and restrooms.",
    pay: 500.0,
    date: "2024-07-05",
    user_id: 1,
    provider_id: 1,
  },
];

// * This function will bulk create the seed data for the tickets
const seedTickets = () => Ticket.bulkCreate(ticketData);

module.exports = seedTickets;
