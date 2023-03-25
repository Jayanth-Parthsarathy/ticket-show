const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const showSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  tags: {
    type: [String],
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  venues: [ { type: Schema.Types.ObjectId, ref: "Venue" }],
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
