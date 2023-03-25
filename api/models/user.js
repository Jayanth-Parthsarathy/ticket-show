const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
