// * This file contains the function to compare the date of two tickets and return the most recent ticket
function compareDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function getMostRecentTicket(tickets) {
  if (tickets.some(futureDate)) {
    return tickets.findLast(futureDate);
  } else {
    return tickets.find(pastDate);
  }
}

function futureDate(a) {
  return new Date(a.date) - new Date() > -1 * 1000 * 60 * 60 * 24;
}

function pastDate(a) {
  return new Date(a.date) - new Date() <= -1 * 1000 * 60 * 60 * 24;
}
module.exports = {
  compareDate,
  getMostRecentTicket,
};
