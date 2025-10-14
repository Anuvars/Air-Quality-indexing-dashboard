const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/airqualitydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Routes
const airQualityRoute = require("./routes/airQuality");
app.use("/api/airquality", airQualityRoute);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
