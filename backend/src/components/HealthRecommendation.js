import React from "react";

const HealthRecommendation = ({ aqi }) => {
  let recommendation = "";
  let color = "";

  if (aqi <= 50) {
    recommendation = "Good – Safe for outdoor activities";
    color = "text-green-400 border-green-500 shadow-green-500/40";
  } else if (aqi <= 100) {
    recommendation = "Moderate – Acceptable, but sensitive groups should take care";
    color = "text-yellow-400 border-yellow-500 shadow-yellow-500/40";
  } else if (aqi <= 150) {
    recommendation = "Unhealthy for Sensitive Groups – Reduce prolonged outdoor exertion";
    color = "text-orange-400 border-orange-500 shadow-orange-500/40";
  } else if (aqi <= 200) {
    recommendation = "Unhealthy – Avoid outdoor activities";
    color = "text-red-400 border-red-500 shadow-red-500/40";
  } else if (aqi <= 300) {
    recommendation = "Very Unhealthy – Health alert, everyone may be affected";
    color = "text-purple-400 border-purple-500 shadow-purple-500/40";
  } else {
    recommendation = "Hazardous – Emergency conditions, avoid going out";
    color = "text-pink-400 border-pink-500 shadow-pink-500/40";
  }

  return (
    <div className={`mt-6 p-4 rounded-2xl border backdrop-blur-lg bg-white/10 shadow-lg ${color}`}>
      <h2 className="text-lg font-semibold">Health Recommendation</h2>
      <p className="mt-2 text-base">{recommendation}</p>
    </div>
  );
};

export default HealthRecommendation;
