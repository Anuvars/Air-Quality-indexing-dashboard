import React from "react";

const AlertsPanel = ({ alerts }) => {
  return (
    <div className="w-80 bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-gray-700">
      <h2 className="text-lg font-semibold text-red-400 mb-3">⚠ Alerts</h2>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div
              key={index}
              className="p-3 bg-red-500/10 border border-red-500 rounded-lg shadow-md"
            >
              <p className="text-red-300 font-medium">{alert.metric}</p>
              <p className="text-sm text-gray-300">Value: {alert.value}</p>
              <p className="text-xs text-gray-400">Threshold: {alert.threshold}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No alerts at the moment ✅</p>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
