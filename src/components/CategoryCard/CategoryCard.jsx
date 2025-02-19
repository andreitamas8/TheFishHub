import { useNavigate } from "react-router-dom";
import { getCategoryName } from "../../assets";

import { motion } from "framer-motion";

export function CategoryCard({ category, className = "" }) {
  const navigate = useNavigate();
  function handleClick(category) {
    navigate(`/category/${category}`);
  }
  return (
    <motion.div
      whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
      className={`${className} rounded-[18px] h-full w-full bg-white drop-shadow-sm`}
      onClick={() => handleClick(category)}
    >
      <div className="rounded-[12px] p-2">
        <p className="text-xl text-center">{getCategoryName(category)}</p>
      </div>
    </motion.div>
  );
}
