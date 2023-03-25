const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const venueSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  shows: [{ type: Schema.Types.ObjectId, ref: "Show" }],
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
