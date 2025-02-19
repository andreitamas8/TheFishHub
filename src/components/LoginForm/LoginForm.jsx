import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { CircularProgress } from "../CircularProgress/CircularProgress";

export function LoginForm({ handleLogin, navigateToHome = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useAuth();
  let progress = useMotionValue(90);
  const [animationComplete, setAnimationComplete] = useState(true); // NEW state
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const isPersonalDataSet = useSelector(
    (state) => state.user.isPersonalDataSet
  );
  const handleInputChange = (e) => {
    setError(null);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await handleLogin(credentials, dispatch);

      setAnimationComplete(false);
      setTimeout(() => {
        setAnimationComplete(true);
        !isPersonalDataSet && navigate("/accountInfo");
        isPersonalDataSet && navigateToHome && navigate("/");
      }, 1500);
    } catch (err) {
      setError("Invalid email or password");
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
        <>
          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-green sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-dark-green">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-dark-green sm:text-sm"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <motion.div
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
            >
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </motion.div>
          </form>
        </>
      )}
    </>
  );
}
