const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ticketSchema = mongoose.Schema({
  show: { type: Schema.Types.ObjectId, ref: "Show", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
