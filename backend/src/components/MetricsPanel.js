// src/components/MetricsPanel.js
import React from "react";
import MetricCircle from "./MetricCircle";

export default function MetricsPanel({ data }) {
  // Utility to determine color
  const getColor = (value, threshold) => {
    if (value === null || value === undefined) return "grey";
    return value > threshold ? "red" : "green";
  };

  return (
    <div className="grid grid-cols-4 gap-6 justify-center items-center mt-8">
      <MetricCircle
        label="AQI"
        value={data.aqi}
        unit=""
        threshold={100}
        color={getColor(data.aqi, 100)}
      />
      <MetricCircle
        label="PM"
        value={data.pm25} // Using PM2.5 as general PM
        unit="µg/m³"
        threshold={50}
        color={getColor(data.pm25, 50)}
      />
      <MetricCircle
        label="CO₂"
        value={data.co2}
        unit="ppm"
        threshold={1000}
        color={getColor(data.co2, 1000)}
      />
      <MetricCircle
        label="CO"
        value={data.co}
        unit="ppm"
        threshold={10}
        color={getColor(data.co, 10)}
      />
      <MetricCircle
        label="CH₂O"
        value={data.ch2o}
        unit="ppb"
        threshold={80}
        color={getColor(data.ch2o, 80)}
      />
      <MetricCircle
        label="O₃"
        value={data.o3}
        unit="ppb"
        threshold={120}
        color={getColor(data.o3, 120)}
      />
      <MetricCircle
        label="SO₂"
        value={data.so2}
        unit="ppb"
        threshold={75}
        color={getColor(data.so2, 75)}
      />
      <MetricCircle
        label="NO₂"
        value={data.no2}
        unit="ppb"
        threshold={100}
        color={getColor(data.no2, 100)}
      />
      <MetricCircle
        label="VOC"
        value={data.voc}
        unit="ppb"
        threshold={200}
        color={getColor(data.voc, 200)}
      />
    </div>
  );
}
