const { Router } = require("express");
const {
  getVenue,
  getVenues,
  createVenue,
  deleteVenue,
  updateVenue,
  displayShows,
  addShow,
} = require("../controllers/venueController");
const app = Router();
const { checkAdmin } = require("../middleware/adminMiddleware");
app.get("/", getVenues);
app.get("/:id", getVenue);
app.post("/", checkAdmin, createVenue);
app.post("/:id", checkAdmin, updateVenue);
app.delete("/:id", checkAdmin, deleteVenue);
app.get("/:id/shows", displayShows);
app.post("/:id/addShow", checkAdmin, addShow);
module.exports = app;
