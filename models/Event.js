const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter email"],
  },
  location: {
    type: String,
    required: [true, "Please enter email"],
  },
  createdBy: {
    type: String,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
  },
  endAt: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("event", userSchema);

module.exports = Event;
