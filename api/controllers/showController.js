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
  const show = await Show.findById(req.params.id);
  res.send(show);
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
  const venue = await Venue.findById(req.params.venueid);
  const ticket = await new Ticket({ user, show: bookedShow, venue });
  const newTicket = await ticket.save();
  let userUpdate = await User.findByIdAndUpdate(req.user._id, {
    $push: { tickets: newTicket },
  });
  let showUpdate = await Show.findByIdAndUpdate(req.params.id, {
    $push: {
      tickets: newTicket,
    },
  });
  let venueUpdate = await Venue.findByIdAndUpdate(req.params.venueid, {
    $push: {
      tickets: newTicket,
    },
  });
  userUpdate = await User.findById(req.user._id);
  showUpdate = await Show.findById(req.params.id);
  venueUpdate = await Venue.findById(req.params.venueid);
  res.status(201).send({
    user: {
      username: userUpdate.username,
      userid: userUpdate._id,
      tickets: userUpdate.tickets,
    },
    ticket: newTicket._id,
    show: {
      showname: showUpdate.name,
      showid: showUpdate._id,
      tickets: showUpdate.tickets,
    },
    venue: {
      venuename: venueUpdate.name,
      tickets: venueUpdate.tickets,
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
