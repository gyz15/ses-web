// @desc Import
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// @desc Initialize
const app = express();
const mongoURI = process.env.MONGO_URI;
var environment = process.env.NODE_ENV || "development";
const port = process.env.PORT || 5000;

// @desc Mongoose
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// @desc CORS
const corsConfig = {
  origin: "http://localhost:3000",
};
app.use(cors(corsConfig));

// @desc Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @desc Models
const Dump = require("./models/Dump");

// @desc Authentication

// @desc Route
app.use("/api/dumps", require("./routes/api/dumps"));
app.use("/api/stations", require("./routes/api/stations"));

// @desc Listen

app.use(express.static("client/build"));
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
