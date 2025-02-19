import { useDispatch, useSelector } from "react-redux";
import { PersonalDataForm } from "../components";
import { userPersonalData } from "../redux/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PersonalInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalData = useSelector((state) => state.user.personalData);

  useEffect(() => {
    console.log("reduxPersonalData = ", personalData);
  }, [personalData]);
  function handleSubmit(personalData) {
    dispatch(userPersonalData({ personalData: personalData }));
    navigate("/");
  }

  return (
    <>
      {/* Show loading animation until it's fully done */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Personal Information
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <PersonalDataForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
