const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  block: String,
  floor: String,
  room: mongoose.Schema.Types.Mixed,
  room_no: mongoose.Schema.Types.Mixed,
  name: String,
  room_name: String,
  type: String,   // classroom, lab, office, washroom, building, canteen, etc.
  latitude: Number,
  longitude: Number,
  nickname: String,
  description: String
}, { strict: false });

module.exports = mongoose.models.Location || mongoose.model("Location", locationSchema);
