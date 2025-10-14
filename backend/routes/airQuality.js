const express = require("express");
const router = express.Router();
const AirQuality = require("../models/AirQuality");

// Fetch latest metrics for Coimbatore (case-insensitive)
router.get("/current", async (req, res) => {
  try {
    const latest = await AirQuality.findOne({ LOCATION: { $regex: /^Coimbatore$/i } })
      .sort({ TIMESTAMP: -1 })
      .lean();

    // Default values if no data is found
    const defaults = {
      AQI: 75,
      PM: 40,
      CO2: 700,
      CO: 5,
      CH2O: 50,
      O3: 90,
      SO2: 40,
      NO2: 35,
      VOC: 120,
      NOISE_LEVEL: 50,
      TEMPERATURE: 30,
      HUMIDITY: 50,
    };

    if (!latest) {
      return res.json(defaults);
    }

    // Use actual values if present, otherwise fallback to defaults
    const response = {
      AQI: latest.AQI ?? defaults.AQI,
      PM: latest.PM ?? defaults.PM,
      CO2: latest.CO2 ?? defaults.CO2,
      CO: latest.CO ?? defaults.CO,
      CH2O: latest.CH2O ?? defaults.CH2O,
      O3: latest.O3 ?? defaults.O3,
      SO2: latest.SO2 ?? defaults.SO2,
      NO2: latest.NO2 ?? defaults.NO2,
      VOC: latest.VOC ?? defaults.VOC,
      NOISE_LEVEL: latest.NOISE_LEVEL ?? defaults.NOISE_LEVEL,
      TEMPERATURE: latest.TEMPERATURE ?? defaults.TEMPERATURE,
      HUMIDITY: latest.HUMIDITY ?? defaults.HUMIDITY,
    };

    res.json(response);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
