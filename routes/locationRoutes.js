const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

// Get all locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().lean();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search locations
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }

    const regex = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
    const results = await Location.find({
      $or: [
        { name: regex },
        { room_name: regex },
        { room: regex },
        { room_no: regex },
        { block: regex },
        { floor: regex },
        { nickname: regex }
      ]
    }).lean();

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;