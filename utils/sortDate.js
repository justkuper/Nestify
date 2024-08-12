// for Array.sort() to index an earlier data to sort from future to past
function compareDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

// find the most recent ticket. If there is no eligible one from today to the future, find the most recent one from the past. 
function getMostRecentTicket(tickets) {
  if (tickets.some(futureDate)) {
    return tickets.findLast(futureDate);
  } else {
    return tickets.find(pastDate);
  }
}

// today to future
function futureDate(a) {
  return new Date(a.date) - new Date() > -1 * 1000 * 60 * 60 * 24;
}

// yesterday to past
function pastDate(a) {
  return new Date(a.date) - new Date() <= -1 * 1000 * 60 * 60 * 24;
}
module.exports = {
  compareDate,
  getMostRecentTicket,
};
