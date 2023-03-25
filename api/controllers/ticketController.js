const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const Show = require("../models/show");
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("tickets");
  const tickets = user.tickets;
  res.json(tickets);
});



module.exports = {
  getTickets,
};
