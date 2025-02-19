import { motion } from "framer-motion";
import { classNames } from "../../assets";

export function Button({ title, type = "", handleClick, disabled = false }) {
  return (
    <motion.div whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}>
      <button
        type={type}
        disabled={disabled}
        className={`${
          disabled
            ? classNames(
                "flex w-full justify-center rounded-[18px] px-3 py-2 text-md font-semibold text-white shadow-sm mt-10",
                !disabled ? "bg-dark-green" : "bg-gray-400 cursor-not-allowed"
              )
            : "flex w-full justify-center rounded-[18px] bg-dark-green px-3 py-2 text-md font-semibold text-white shadow-sm mt-10"
        }`}
        onClick={handleClick}
      >
        {title}
      </button>
    </motion.div>
  );
}
