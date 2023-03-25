const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const Show = require("../models/show");
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("tickets");
  const ticket = await Ticket.find({ user: req.user.id })
    .populate("venue", "name")
    .populate("show", "name startTime endTime")
    .populate("user", "username");
  res.json(ticket);
});

module.exports = {
  getTickets,
};
