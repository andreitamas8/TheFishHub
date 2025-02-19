import { useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";

export function SubcategorySlider({ category, className = "" }) {
  const { subcategory } = useParams();
  const subcategories = useSelector((state) => state.subcategories);
  const selectedCategory = subcategories[category] || null;
  if (!selectedCategory) return null;

  return (
    <div className={`${className} flex gap-2 overflow-x-auto text-center`}>
      {selectedCategory.map((subcat, index) => (
        <motion.div
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          key={index}
          className={`${
            subcategory === subcat ? "bg-dark-green text-white" : "bg-white"
          } flex h-full w-full p-2 rounded-[18px] drop-shadow-md`}
        >
          <NavLink to={`/category/${category}/${subcat}`}>
            <p className="text-nowrap">{subcat}</p>
          </NavLink>
        </motion.div>
      ))}
    </div>
  );
}
