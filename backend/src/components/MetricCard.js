// MetricCard.js
import { motion } from "framer-motion";

const MetricCard = ({ name, value, unit, threshold }) => {
  const isAlert = value > threshold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`p-4 rounded-2xl shadow-md flex items-center gap-3 font-[Times_New_Roman]
                  ${isAlert ? "border-red-500 border-2" : "border-gray-300"}`}
    >
      <motion.div
        className={`w-4 h-4 rounded-full ${isAlert ? "bg-red-500" : "bg-green-500"}`}
        animate={
          isAlert
            ? { scale: [1, 1.2, 1], boxShadow: ["0 0 5px red", "0 0 15px red", "0 0 5px red"] }
            : { scale: [1, 1.1, 1], boxShadow: ["0 0 5px green", "0 0 10px green", "0 0 5px green"] }
        }
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <div>
        <h3 className="text-lg">{name}</h3>
        <p className="text-xl">{value} {unit}</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;
