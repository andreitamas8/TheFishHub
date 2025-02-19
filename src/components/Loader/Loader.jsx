import { useState, useEffect } from "react";

import fishImage from "../../assets/Images/Circling Fish Icon.svg";

export const Loader = ({ loading }) => {
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setVisible(false), 500); // Give it time to fade out
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [loading]);
  if (!visible) return null; // Don't render if not visible

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center bg-white transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src={fishImage}
        alt="Loading..."
        className="w-24 h-24 animate-spin-slow"
      />
    </div>
  );
};
