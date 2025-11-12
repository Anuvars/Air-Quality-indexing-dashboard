import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function DashboardDynamic({ isDark }) {
  const [metrics, setMetrics] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  const metricConfig = {
    AQI: { unit: "", threshold: 100 },
    PM: { unit: "µg/m³", threshold: 50 },
    CO2: { unit: "ppm", threshold: 1000 },
    CO: { unit: "ppm", threshold: 10 },
    CH2O: { unit: "ppb", threshold: 80 },
    O3: { unit: "ppb", threshold: 120 },
    SO2: { unit: "ppb", threshold: 75 },
    NO2: { unit: "ppb", threshold: 100 },
    VOC: { unit: "ppb", threshold: 200 },
    NOISE_LEVEL: { unit: "dB", threshold: 70 },
    TEMPERATURE: { unit: "°C", threshold: 35 },
    HUMIDITY: { unit: "%", threshold: 60 },
  };

  // Fetch metrics from backend every 3 seconds
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/airquality/current?location=COIMBATORE");
        const data = res.data || {};

        const metricsArray = Object.keys(metricConfig).map((key) => ({
          label: key,
          value: data[key] ?? 0,
          unit: metricConfig[key].unit,
          threshold: metricConfig[key].threshold,
        }));

        setMetrics(metricsArray);

        const newAlerts = metricsArray.filter((m) => m.value > m.threshold);
        setAlerts(newAlerts);

        const aqi = data.AQI ?? 0;
        if (aqi <= 50) setRecommendation("Good – Safe for outdoor activities ✅");
        else if (aqi <= 100) setRecommendation("Moderate – Acceptable air quality ⚠");
        else if (aqi <= 150) setRecommendation("Unhealthy for Sensitive Groups 😷");
        else if (aqi <= 200) setRecommendation("Unhealthy – Avoid outdoor exertion 🚫");
        else if (aqi <= 300) setRecommendation("Very Unhealthy – Stay indoors 🏠");
        else setRecommendation("Hazardous – Serious health risks ☠️");
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update trend data
  useEffect(() => {
    if (metrics.length === 0) return;
    const interval = setInterval(() => {
      const now = new Date();
      const trendPoint = { time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      metrics.forEach((m) => (trendPoint[m.label] = m.value));
      setTrendData((prev) => [...prev.slice(-23), trendPoint]);
    }, 3000);
    return () => clearInterval(interval);
  }, [metrics]);

  const centerMetric = metrics.find((m) => m.label === "AQI") || metrics[0];
  const surroundingMetrics = metrics.filter((m) => m.label !== "AQI");
  const radius = 230;
  const cardSize = 120;
  const centerX = 350;
  const centerY = 350;

  const getProgressColor = (metric) =>
    metric.value > metric.threshold ? "error.main" : isDark ? "#4ade80" : "#16a34a";

  if (!metrics.length) return <Typography>Loading metrics...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: 4, minHeight: "100vh", backgroundColor: isDark ? "#121212" : "#f9f9f9", padding: 2 }}>
      {/* Left: Circular Dashboard & Trends */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ position: "relative", width: "700px", height: "700px" }}>
          {/* Center Metric */}
          <Card sx={{ width: 150, height: 150, borderRadius: 3, boxShadow: 3, textAlign: "center", position: "absolute", top: centerY - 75, left: centerX - 75, backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress variant="determinate" value={100} size={90} thickness={5} sx={{ color: getProgressColor(centerMetric) }} />
                <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="h6">{centerMetric.value}</Typography>
                </Box>
              </Box>
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>{centerMetric.label}</Typography>
              <Typography variant="caption" color="text.secondary">{centerMetric.unit}</Typography>
            </CardContent>
          </Card>

          {/* Surrounding Metrics */}
          {surroundingMetrics.map((metric, index) => {
            const angle = (index / surroundingMetrics.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - cardSize / 2;
            const y = centerY + radius * Math.sin(angle) - cardSize / 2;
            return (
              <Card key={index} sx={{ width: cardSize, height: cardSize, borderRadius: 3, boxShadow: 3, textAlign: "center", position: "absolute", top: y, left: x, backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress variant="determinate" value={metric.value > 100 ? 100 : metric.value} size={60} thickness={4} sx={{ color: getProgressColor(metric) }} />
                    <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="body2">{metric.value}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: "bold" }}>{metric.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{metric.unit}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Trend Graph */}
        <Box sx={{ width: "100%", maxWidth: 700, mt: 4, alignSelf: "flex-start" }}>
          <Card sx={{ backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000", borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>Trend Graphs (Live Updates)</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#ddd"} />
                  <XAxis dataKey="time" stroke={isDark ? "#e2e8f0" : "#000"} />
                  <YAxis stroke={isDark ? "#e2e8f0" : "#000"} />
                  <Tooltip contentStyle={{ backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000" }} />
                  <Legend />
                  {metrics.slice(0, 5).map((m, idx) => (
                    <Line key={idx} type="monotone" dataKey={m.label} stroke={`hsl(${(idx * 60) % 360}, 70%, 50%)`} strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Right Panel: Alerts + Recommendation */}
      <Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 3 }}>
        <Card sx={{ backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000", borderRadius: 3, boxShadow: 3, p: 2, flex: 1, overflowY: "auto" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>⚠ Alerts Panel</Typography>
          {alerts.length > 0 ? alerts.map((alert, index) => (
            <Card key={index} sx={{ backgroundColor: isDark ? "#b91c1c" : "#fee2e2", color: isDark ? "#fff" : "#b91c1c", borderRadius: 2, mb: 2, p: 2, boxShadow: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{alert.label}</Typography>
              <Typography variant="body2">Value: {alert.value} {alert.unit}</Typography>
              <Typography variant="caption">Threshold: {alert.threshold} {alert.unit}</Typography>
            </Card>
          )) : <Typography variant="body2" color="text.secondary">No alerts at the moment ✅</Typography>}
        </Card>

        <Card sx={{ backgroundColor: isDark ? "#1e293b" : "#fff", color: isDark ? "#fff" : "#000", borderRadius: 3, boxShadow: 3, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>💡 Health Recommendation</Typography>
          <Typography variant="body1">{recommendation}</Typography>
        </Card>
      </Box>
    </Box>
  );
}
