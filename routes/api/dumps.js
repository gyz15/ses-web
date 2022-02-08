// @desc Import
const express = require("express");
const router = express.Router();
const Dump = require("../../models/Dump");
const { alertUser } = require("../../botMsg");

// @route		POST /api/dumps/create
// @desc		Create a dump
// @access	Public
router.route("/create").post((req, res) => {
  try {
    const { content, machineId } = req.body;
    if (
      content === "Humidity too high" ||
      content === "Mass exceeded" ||
      content === "Gas detected" ||
      content === "Refreshed"
    ) {
      let level = "info";
      switch (content) {
        case "Refreshed":
          level = "info";
          break;
        case "Mass exceeded":
          level = "warn";
          break;
        case "Gas detected":
          level = "danger";
          break;
        case "Humidity too high":
          level = "danger";
          break;
        default:
          level = "info";
          break;
      }
      const newDump = new Dump({
        content,
        machineId,
        level,
      });
      if (content === "Mass exceeded") {
        // console.log("Alert user");
        alertUser(machineId);
      }
      newDump.save().then((dump) => res.status(201).json(dump));
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.route("/latest-five").get((req, res) => {
  // Get the latest 5 dumps
  Dump.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .then((dumps) => res.status(200).json(dumps))
    .catch((e) => res.status(500).json({ message: e.message }));
});

module.exports = router;
