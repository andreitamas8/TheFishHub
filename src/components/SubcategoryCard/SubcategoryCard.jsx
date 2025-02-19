import { useNavigate } from "react-router-dom";
import { getCategoryName } from "../../assets";

import { motion } from "framer-motion";

export function SubcategoryCard({ category, className = "", onClick }) {
  function handleClick(category) {
    onClick(category);
  }
  return (
    <motion.div
      whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
      className={`${className} rounded-[18px] h-full w-full bg-white drop-shadow-sm`}
      onClick={() => handleClick(category)}
    >
      <div className="rounded-[12px] p-2">
        <p className="text-center p-2">{category}</p>
      </div>
    </motion.div>
  );
}
