const Show = require("../models/show");
const Venue = require("../models/venue");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticket");
const getShows = asyncHandler(async (req, res) => {
  const shows = await Show.find({});
  res.status(200).send(shows);
});

const getShow = asyncHandler(async (req, res) => {
  res.send("Getting a show");
});

const createShow = asyncHandler(async (req, res) => {
  const show = new Show(req.body);
  show.venues.forEach(async (venue) => {
    let upvenue = await Venue.findById(venue._id);
    upvenue.shows.push(show);
    await upvenue.save();
  });
  const newShow = await show.save();
  res.status(201).send(newShow);
});

const addVenue = asyncHandler(async (req, res) => {
  const { venues } = req.body;
  const updatedShow = await Show.findByIdAndUpdate(
    req.params.id,
    { venues },
    {
      new: true,
    }
  );
  res.send(updatedShow);
});

const updateShow = asyncHandler(async (req, res) => {
  const show = await Show.findByIdAndUpdate(req.params.id, req.body);
  const upShow = await Show.findById(req.params.id);

  res.status(200).send(upShow);
});

const deleteShow = asyncHandler(async (req, res) => {
  const show = await Show.findByIdAndDelete(req.params.id);
  res.json(show);
});

const bookTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const bookedShow = await Show.findById(req.params.id);
  const ticket = await new Ticket({ user, show: bookedShow });
  const newTicket = await ticket.save();
  let userUpdate = await User.findByIdAndUpdate(req.user._id, {
    $push: { tickets: newTicket },
  });
  let showUpdate = await Show.findByIdAndUpdate(req.params.id, {
    $push: {
      tickets: newTicket,
    },
  });
  userUpdate = await User.findById(req.user._id);
  showUpdate = await Show.findById(req.params.id);
  res.status(201).send({
    user: {
      userid: userUpdate._id,
      tickets: userUpdate.tickets,
    },
    ticket: newTicket._id,
    show: {
      showid: showUpdate._id,
      tickets: showUpdate.tickets,
    },
  });
});

module.exports = {
  createShow,
  getShow,
  getShows,
  deleteShow,
  updateShow,
  addVenue,
  bookTicket,
};
