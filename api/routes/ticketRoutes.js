const { Router } = require("express");
const { getTickets } = require("../controllers/ticketController");
const app = Router();
const { protect } = require("../middleware/authMiddleware");
app.get("/getTickets", protect, getTickets);

module.exports = app;
