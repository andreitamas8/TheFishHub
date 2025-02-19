import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { getUrl } from "../api/data";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { Button, Loader } from "../components";
import { camelCaseToWords, classNames } from "../assets";
import { addItemToCart } from "../redux/cartItemsSlice";
import { useDispatch } from "react-redux";

const RadioButton = ({ value, label, checked, onChange, inStock }) => (
  <Radio
    value={value}
    checked={checked}
    onChange={onChange}
    disabled={!inStock}
    className={classNames(
      inStock
        ? "cursor-pointer bg-white text-gray-900 shadow-xs"
        : "cursor-not-allowed bg-gray-50 text-gray-200",
      "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6",
      checked ? "border-dark-green" : "border-gray-200"
    )}
  >
    <span>{label}</span>
  </Radio>
);

export function ProductPage() {
  const { id } = useParams();
  const url = getUrl({ id });
  const { data, loading } = useFetch(url);
  const [selectedGender, setSelectedGender] = useState(null);
  const [error, setError] = useState(""); // Error state for validation
  const dispatch = useDispatch();

  const handleAddToCartNoFish = () => {
    dispatch(addItemToCart({ ...data, selectedGender }));
  };

  const handleAddToCart = () => {
    if (!selectedGender) {
      console.log("🚨 No gender selected!");
      return;
    }

    console.log("✅ Selected Gender:", selectedGender); // Debugging

    dispatch(addItemToCart({ ...data, selectedGender }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGender) {
      setError("Please select a gender."); // Show error if gender not selected
      return;
    }
    setError(""); // Clear error if valid
    handleAddToCart();
  };

  return (
    <>
      <Loader loading={loading} />
      {!loading && data && (
        <div className="bg-offwhite">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <img
              alt="alt"
              src="https://placehold.co/600x400/000000/FFFFFF/png"
              className="object-cover rounded-[18px] p-2 drop-shadow-md"
            />
            <img
              alt="alt"
              src="https://placehold.co/600x400/000000/FFFFFF/png"
              className="object-cover rounded-[18px] p-2 drop-shadow-md "
            />
            <img
              alt="alt"
              src="https://placehold.co/600x400/000000/FFFFFF/png"
              className="object-cover rounded-[18px] p-2 drop-shadow-md "
            />
          </div>

          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data.name}
              </h1>
              <p className="text-md tracking-tight text-gray-900">
                {data.brand}
              </p>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {data.price}
              </p>

              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          data.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{data.rating} out of 5 stars</p>
                  <a className="ml-3 text-sm font-medium text-dark-green">
                    {data.ratingCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10" onSubmit={handleSubmit}>
                {data.name.includes("Fish") ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Gender
                      </h3>
                    </div>
                    <fieldset className="mt-4">
                      <RadioGroup
                        value={selectedGender}
                        onChange={setSelectedGender}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4 w-full"
                      >
                        <RadioButton
                          value="female"
                          label="Female"
                          checked={selectedGender === "female"}
                          onChange={() => setSelectedGender("female")}
                          inStock={data.femalesInStock}
                        />
                        <RadioButton
                          value="male"
                          label="Male"
                          checked={selectedGender === "male"}
                          onChange={() => setSelectedGender("male")}
                          inStock={data.malesInStock}
                        />
                      </RadioGroup>
                    </fieldset>

                    {error && (
                      <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}
                    <Button
                      title="Add to cart"
                      handleClick={handleAddToCart}
                      disabled={!selectedGender}
                    />
                  </>
                ) : (
                  <Button
                    title="Add to cart"
                    handleClick={() => handleAddToCartNoFish()}
                  />
                )}
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h3 className="sr-only">Description</h3>
                <p className="text-base text-gray-900">{data.description}</p>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {Object.entries(data.highlights).map(([key, highlight]) => (
                    <li key={key} className="text-gray-400">
                      <span className="text-gray-600">
                        {camelCaseToWords(key)} - {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <p className="text-sm text-gray-600">{data.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
