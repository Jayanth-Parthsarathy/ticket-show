const Venue = require("../models/venue");
const asyncHandler = require("express-async-handler");
const Show = require("../models/show");
const getVenues = asyncHandler(async (req, res) => {
  const venues = await Venue.find({});
  res.status(200).send(venues);
});

const getVenue = asyncHandler(async (req, res) => {
  const venue = await Venue.findById(req.params.id);
  res.status(200).send(venue);
});

const createVenue = asyncHandler(async (req, res) => {
  const venue = await new Venue(req.body);
  const newVenue = await venue.save();
  res.status(201).send(newVenue);
});

const updateVenue = asyncHandler(async (req, res) => {
  res.send("Updating a venue");
});

const deleteVenue = asyncHandler(async (req, res) => {
  const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
  res.send(deletedVenue);
});

const displayShows = asyncHandler(async (req, res) => {
  const venue = await Venue.findById(req.params.id).populate("shows");
  res.json(venue.shows);
});

const addShow = asyncHandler(async (req, res) => {
  const show = await new Show(req.body);
  const newShow = await show.save();
  const venue = await Venue.findByIdAndUpdate(req.params.id, {
    $push: { shows: newShow },
  });
  const newVenue = await Venue.findById(req.params.id);
  res.json(newVenue.shows);
});

module.exports = {
  createVenue,
  updateVenue,
  deleteVenue,
  getVenue,
  getVenues,
  displayShows,
  addShow,
};
