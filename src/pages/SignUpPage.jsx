import { NavLink } from "react-router-dom";
import { RegisterForm } from "../components";
import { useRegister } from "../hooks";

export function SignUpPage() {
  const { handleRegister } = useRegister();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <RegisterForm handleRegister={handleRegister} />
        <p className="flex flex-col mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?
          <NavLink to={"/login"} className="font-semibold text-dark-green">
            Sign In!
          </NavLink>
        </p>
      </div>
    </>
  );
}
