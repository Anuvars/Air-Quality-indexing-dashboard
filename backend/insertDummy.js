const mongoose = require("mongoose");
const AirQuality = require("./models/AirQuality");

mongoose.connect("mongodb://127.0.0.1:27017/airqualitydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db = mongoose.connection;
db.once("open", async () => {
  console.log("Connected to MongoDB");

  const dummyData = {
    LOCATION: "Coimbatore",
    AQI: 85,
    PM: 40,
    CO2: 600,
    CO: 5,
    CH2O: 30,
    O3: 50,
    SO2: 20,
    NO2: 30,
    VOC: 100,
    NOISE_LEVEL: 60,
    TEMPERATURE: 28,
    HUMIDITY: 55,
    TIMESTAMP: new Date(),
  };

  await AirQuality.create(dummyData);
  console.log("Inserted dummy data");
  mongoose.connection.close();
});
