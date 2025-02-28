import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  fetchBackendCart,
  setCart,
} from "../../redux/cartItemsSlice";
import { logout } from "../../redux/userSlice";

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string" || !string) return ""; // Ensure it's a string
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function getCategoryName(category) {
  switch (category) {
    case "freshWater":
      return "Fresh Water";

    case "saltWater":
      return "Salt Water";

    case "terrariums":
      return "Terrariums";

    case "lakesAndPonds":
      return "Lakes And Ponds";

    default:
      return "";
  }
}
export const camelCaseToWords = (str) => {
  const words = str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const handleRouteChange = (navigate, callback, onClose, ...args) => {
  setTimeout(() => {
    if (onClose) onClose(); // Close popover if provided
    callback(...args);
  }, 300);
};
