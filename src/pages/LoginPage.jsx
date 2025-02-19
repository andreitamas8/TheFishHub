import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components";
import { NavLink } from "react-router-dom";

export function LoginPage() {
  const { handleLogin, loading, error } = useAuth();

  return (
    <>
      {/* Show loading animation until it's fully done */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm handleLogin={handleLogin} navigateToHome={true} />
          <p className="flex flex-col mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            <NavLink to={"/signup"} className="font-semibold text-dark-green">
              Create one!
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
