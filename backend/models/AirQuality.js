const mongoose = require("mongoose");

const AirSchema = new mongoose.Schema({
  LOCATION: { type: String, default: "Coimbatore" },
  TIMESTAMP: { type: Date, default: Date.now },

  AQI: { type: Number, default: 0 },
  PM: { type: Number, default: 0 },
  CO2: { type: Number, default: 0 },
  CO: { type: Number, default: 0 },
  CH2O: { type: Number, default: 0 },
  O3: { type: Number, default: 0 },
  SO2: { type: Number, default: 0 },
  NO2: { type: Number, default: 0 },
  VOC: { type: Number, default: 0 },
  NOISE_LEVEL: { type: Number, default: 0 },
  TEMPERATURE: { type: Number, default: 0 },
  HUMIDITY: { type: Number, default: 0 },
}, { versionKey: false });

module.exports = mongoose.model("AirQuality", AirSchema);
