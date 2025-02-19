import { motion, useMotionValue } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../../hooks";
import { CircularProgress } from "../CircularProgress/CircularProgress";

export function RegisterForm({ handleRegister }) {
  const navigate = useNavigate();
  const { loading } = useRegister();
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(true); // NEW state

  const dispatch = useDispatch();
  let progress = useMotionValue(90);

  const handleInputChange = (e) => {
    setError(null);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (credentials.password !== credentials.passwordConfirmation) {
        throw new Error("Passwords don't match!");
      }

      const { passwordConfirmation, ...credentialsToSend } = credentials;
      console.log("Submitting:", credentialsToSend);
      await handleRegister(credentialsToSend, dispatch);

      setAnimationComplete(false);
      setTimeout(() => {
        setAnimationComplete(true);
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message); // Now displays the actual error
    }
  };
  return (
    <>
      {(!error && loading) || !animationComplete ? (
        <div className="flex justify-center items-center ">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 100 }}
            style={{ x: progress }}
            transition={{ duration: 1 }}
          />
          <CircularProgress progress={progress} />
        </div>
      ) : (
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleInputChange}
                  value={credentials.email}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-green sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={handleInputChange}
                  value={credentials.username}
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-green sm:text-sm/6"
                />
              </div>
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  onChange={handleInputChange}
                  value={credentials.password}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-green sm:text-sm/6"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  onChange={handleInputChange}
                  value={credentials.passwordConfirmation}
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-green sm:text-sm/6"
                />
              </div>
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
                className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </motion.div>
          </form>
        </div>
      )}
    </>
  );
}
