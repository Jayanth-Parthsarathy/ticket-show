const { Router } = require("express");
const {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
  addVenue,
  bookTicket,
} = require("../controllers/showController");
const { protect } = require("../middleware/authMiddleware");
const app = Router();
const { checkAdmin } = require("../middleware/adminMiddleware");

app.get("/", getShows);
app.get("/:id", getShow);
app.post("/", checkAdmin, createShow);
app.post("/:id", checkAdmin, updateShow);
app.delete("/:id", checkAdmin, deleteShow);
app.post("/:id/addVenue", checkAdmin, addVenue);
app.post("/:id/bookTicket", protect, bookTicket);
module.exports = app;
