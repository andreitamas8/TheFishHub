import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPersonalData,
  setPersonalDataFalse,
  userPersonalData,
} from "../../redux/userSlice";

export function PersonalDataForm({ handleSubmit }) {
  const dispatch = useDispatch();

  const isPersonalDataSet = useSelector(
    (state) => state.user.isPersonalDataSet
  );
  const reduxUserPersonalData = useSelector((state) => state.user.personalData);
  const [disable, setDisable] = useState(isPersonalDataSet);
  const [personalData, setPersonalData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    setError(null);
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    setDisable(true);
    setError(null);
    if (!personalData.fullName || !personalData.phoneNumber) {
      setError("Full Name and Phone Number are required");
      return;
    }
    console.log("submin = ", personalData);
    handleSubmit(personalData);
  };

  useEffect(() => {
    setDisable(isPersonalDataSet);
  }, [isPersonalDataSet]);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={submitForm}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Full Name
          </label>
          <input
            disabled={disable}
            name="fullName"
            type="text"
            required
            value={personalData.fullName}
            onChange={handleInputChange}
            placeholder={reduxUserPersonalData?.fullName}
            className={`block w-full rounded-md px-3 py-1.5 text-base outline outline-1 placeholder:text-gray-400 focus:outline-dark-green ${
              disable
                ? "bg-gray-200 text-gray-500 outline-gray-300 cursor-not-allowed"
                : "bg-white text-gray-900 outline-gray-300"
            }`}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            disabled={disable}
            name="phoneNumber"
            type="tel"
            required
            value={personalData.phoneNumber}
            placeholder={reduxUserPersonalData?.phoneNumber}
            onChange={handleInputChange}
            className={`block w-full rounded-md px-3 py-1.5 text-base outline outline-1 placeholder:text-gray-400 focus:outline-dark-green ${
              disable
                ? "bg-gray-200 text-gray-500 outline-gray-300 cursor-not-allowed"
                : "bg-white text-gray-900 outline-gray-300"
            }`}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Address
          </label>
          <input
            disabled={disable}
            name="address"
            type="text"
            value={personalData.address}
            placeholder={reduxUserPersonalData?.address}
            onChange={handleInputChange}
            className={`block w-full rounded-md px-3 py-1.5 text-base outline outline-1 placeholder:text-gray-400 focus:outline-dark-green ${
              disable
                ? "bg-gray-200 text-gray-500 outline-gray-300 cursor-not-allowed"
                : "bg-white text-gray-900 outline-gray-300"
            }`}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            City
          </label>
          <input
            disabled={disable}
            name="city"
            type="text"
            value={personalData.city}
            placeholder={reduxUserPersonalData?.city}
            onChange={handleInputChange}
            className={`block w-full rounded-md px-3 py-1.5 text-base outline outline-1 placeholder:text-gray-400 focus:outline-dark-green ${
              disable
                ? "bg-gray-200 text-gray-500 outline-gray-300 cursor-not-allowed"
                : "bg-white text-gray-900 outline-gray-300"
            }`}
          />
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            ZIP Code
          </label>
          <input
            disabled={disable}
            name="zipCode"
            type="text"
            value={personalData.zipCode}
            placeholder={reduxUserPersonalData?.zipCode}
            onChange={handleInputChange}
            className={`block w-full rounded-md px-3 py-1.5 text-base outline outline-1 placeholder:text-gray-400 focus:outline-dark-green ${
              disable
                ? "bg-gray-200 text-gray-500 outline-gray-300 text-gray-300 cursor-not-allowed"
                : "bg-white text-gray-900 outline-gray-300"
            }`}
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        {isPersonalDataSet ? (
          <motion.div whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}>
            <p
              onClick={(e) => {
                e.preventDefault();
                dispatch(setPersonalDataFalse());
                setDisable(false);
              }}
              className={`text-white bg-gray-400 flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Change Personal Info
            </p>
          </motion.div>
        ) : (
          <motion.div whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}>
            <button
              type="submit"
              className={` text-white bg-dark-green flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Save Information
            </button>
          </motion.div>
        )}
      </form>
    </div>
  );
}
