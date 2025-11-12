// src/components/MetricCircle.js
import React from "react";

export default function MetricCircle({ label, value, unit, threshold }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const isSafe = value <= threshold;
  const strokeColor = isSafe ? "green" : "red";

  // Calculate stroke offset safely
  const progress = Math.min(value / threshold, 1); // max 1
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center text-center font-['Times_New_Roman'] relative">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#ccc"
          strokeWidth="10"
          fill="white"
          className="dark:fill-black"
        />
        {/* Value circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={strokeColor}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      {/* Value and unit inside circle */}
      <div className="absolute mt-[-75px]">
        <p className="text-lg font-bold dark:text-white">{value}</p>
        <p className="text-sm dark:text-white">{unit}</p>
      </div>
      {/* Label below circle */}
      <p className="mt-2 font-semibold dark:text-white">{label}</p>
    </div>
  );
}
