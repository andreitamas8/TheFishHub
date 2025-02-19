import { motion } from "framer-motion";
import { useState } from "react";
import { CircularProgress } from "../CircularProgress/CircularProgress";

export function OrderForm({ handleOrder }) {
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  const handleInputChange = (e) => {
    setError(null);
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await handleOrder(orderDetails);
      setAnimationComplete(false);
      setTimeout(() => {
        setAnimationComplete(true);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {loading || !animationComplete ? (
        <div className="flex justify-center items-center h-[416px]">
          <CircularProgress progress={loading ? 50 : 100} />
        </div>
      ) : (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <input
                onChange={handleInputChange}
                value={orderDetails.fullName}
                name="fullName"
                type="text"
                required
                className="input-field"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                onChange={handleInputChange}
                value={orderDetails.email}
                name="email"
                type="email"
                required
                className="input-field"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                onChange={handleInputChange}
                value={orderDetails.address}
                name="address"
                type="text"
                required
                className="input-field"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                City
              </label>
              <input
                onChange={handleInputChange}
                value={orderDetails.city}
                name="city"
                type="text"
                required
                className="input-field"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Postal Code
              </label>
              <input
                onChange={handleInputChange}
                value={orderDetails.postalCode}
                name="postalCode"
                type="text"
                required
                className="input-field"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <input
                onChange={handleInputChange}
                value={orderDetails.phoneNumber}
                name="phoneNumber"
                type="tel"
                required
                className="input-field"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <motion.div
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
            >
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Place Order
              </button>
            </motion.div>
          </form>
        </div>
      )}
    </>
  );
}
