import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Apply theme globally
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <Dashboard isDark={isDark} />
    </div>
  );
}
