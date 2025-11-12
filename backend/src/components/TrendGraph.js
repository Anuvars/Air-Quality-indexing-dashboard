import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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

export default function TrendGraphs({ isDark }) {
  const [trendData, setTrendData] = useState([]);

  // Simulated live fetch
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTrendData((prev) => [
        ...prev.slice(-23), // keep last 24 values
        {
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          AQI: Math.floor(Math.random() * 800),
          CO2: Math.floor(Math.random() * 100),
          Temp: Math.floor(Math.random() * 40),
        },
      ]);
    }, 3000); // every 3s new data

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "20px auto",
        backgroundColor: isDark ? "#121212" : "#f9f9f9",
        transition: "all 0.3s",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Card
        sx={{
          backgroundColor: isDark ? "#1e293b" : "#fff",
          color: isDark ? "#fff" : "#000",
          transition: "all 0.3s",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
          >
            Trend Graphs (Last 24 Hours / 7 Days)
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#ddd"} />
              <XAxis dataKey="time" stroke={isDark ? "#e2e8f0" : "#000"} />
              <YAxis stroke={isDark ? "#e2e8f0" : "#000"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#fff",
                  color: isDark ? "#fff" : "#000",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="AQI" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="CO2" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="Temp" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
