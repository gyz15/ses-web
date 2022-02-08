// @desc Import
const express = require("express");
const router = express.Router();
const Station = require("../../models/Station");

// @route			GET /api/stations
// @desc			Get all stations
// @access			Public
router.route("/").get(async (req, res) => {
  try {
    let station = await Station.find({}, { _id: 0, __v: 0 });
    res.json(station);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.route("/create").post(async (req, res) => {
  // ONLY ALLOW ON DEVELOPMENT
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Not allowed" });
  }
  try {
    const { name, machineId, lat, lng } = req.body;
    const newStation = new Station({
      name,

      machineId,
      lat,
      lng,
    });
    await newStation.save();
    res.status(201).json(newStation);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
