import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalDataFalse } from "../../redux/userSlice";

export function PersonalDataForm({ handleSubmit }) {
  const dispatch = useDispatch();
  const isPersonalDataSet = useSelector(
    (state) => state.user.isPersonalDataSet
  );
  const reduxUserPersonalData = useSelector((state) => state.user.personalData);

  const [disable, setDisable] = useState(isPersonalDataSet);
  const [error, setError] = useState(null);
  const [personalData, setPersonalData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    setDisable(isPersonalDataSet);
  }, [isPersonalDataSet]);

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

    console.log("submit = ", personalData);
    handleSubmit(personalData);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={submitForm}>
        {[
          {
            label: "Full Name",
            name: "fullName",
            type: "text",
            required: true,
          },
          {
            label: "Phone Number",
            name: "phoneNumber",
            type: "tel",
            required: true,
          },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "ZIP Code", name: "zipCode", type: "text" },
        ].map(({ label, name, type, required }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-900">
              {label}
            </label>
            <input
              disabled={disable}
              name={name}
              type={type}
              required={required}
              value={personalData[name]}
              placeholder={reduxUserPersonalData?.[name]}
              onChange={handleInputChange}
              className={`block w-full rounded-md px-3 py-1.5 text-base outline outline-1 placeholder:text-gray-400 focus:outline-dark-green ${
                disable
                  ? "bg-gray-200 text-gray-500 outline-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-900 outline-gray-300"
              }`}
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <motion.div whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}>
          {isPersonalDataSet ? (
            <p
              onClick={(e) => {
                e.preventDefault();
                dispatch(setPersonalDataFalse());
                setDisable(false);
              }}
              className="text-white bg-gray-400 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm cursor-pointer"
            >
              Change Personal Info
            </p>
          ) : (
            <button
              type="submit"
              className="text-white bg-dark-green flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm"
            >
              Save Information
            </button>
          )}
        </motion.div>
      </form>
    </div>
  );
}
