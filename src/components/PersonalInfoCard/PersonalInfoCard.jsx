import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export function PersonalInfoCard() {
  const userPersonalData = useSelector((state) => state.user.personalData);
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    navigate("/accountInfo");
  }
  return (
    <div className=" p-3 rounded-[18px] bg-white drop-shadow-md">
      <h2 className="text-lg font-semibold text-center pb-6">
        Personal Information
      </h2>
      <div className="space-y-4  gap-2 divide-y divide-gray-300">
        {Object.entries(userPersonalData).map(([key, value]) => (
          <div key={key} className="grid grid-cols-2 items-center gap-2">
            <span className="font-medium capitalize text-wrap">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button title="Change personal info" handleClick={handleClick} />
      </div>
    </div>
  );
}
