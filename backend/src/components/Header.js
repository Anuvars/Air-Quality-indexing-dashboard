import React, { useState, useEffect } from "react";
import { Leaf, Sun, Moon } from "lucide-react";

export default function Header({ isDark, toggleTheme }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("Fetching...");

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const address = data.address;
            const bestLocation =
              (address.city && address.state
                ? `${address.city}, ${address.state}`
                : address.city ||
                  address.town ||
                  address.village ||
                  address.state ||
                  "Unknown Location");
            setLocation(bestLocation);
          } catch {
            setLocation("Location not found");
          }
        },
        () => setLocation("Permission denied")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <header
      className={`w-full flex items-center justify-between px-6 py-4 transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Left: Logo + Title + Location */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Leaf className={`text-green-600 ${isDark ? "dark:text-green-400" : ""}`} />
          <h1 className="text-xl font-bold">Air Sense</h1>
        </div>
        <div className="text-sm font-medium">{location}</div>
      </div>

      {/* Centered Date + Time */}
      <div className="flex-1 text-center font-bold text-base">
        {dateTime.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        | {dateTime.toLocaleTimeString()}
      </div>

      {/* Toggle Button */}
      <div>
        <button
          className={`p-2 rounded-full transition ${
            isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={toggleTheme}
        >
          {isDark ? <Moon className="text-yellow-300" /> : <Sun className="text-yellow-500" />}
        </button>
      </div>
    </header>
  );
}
