import { StarIcon } from "@heroicons/react/20/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartItemsSlice";
import { useEffect, useRef, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";

const RadioButton = ({ value, label, checked, onChange, inStock }) => (
  <Radio
    value={value}
    checked={checked}
    onChange={onChange}
    disabled={!inStock}
    className={`relative group flex items-center justify-center px-4 py-1 text-sm font-medium uppercase rounded-[18px] sm:py-6 cursor-pointer ${
      inStock
        ? "bg-black text-white"
        : "bg-gray-500 text-gray-200 cursor-not-allowed"
    } ${checked ? "bg-dark-green" : "bg-gray-500"}`}
  >
    <span>{label}</span>
    {!inStock && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-[18px]">
        <span className="text-white text-xl font-bold">✖</span>
      </div>
    )}
  </Radio>
);

export function ProductCard({ onClick, product, className = "" }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const [openSelectGender, setOpenSelectGender] = useState(false);
  const dispatch = useDispatch();
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpenSelectGender(false);
      }
    }
    if (openSelectGender) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSelectGender]);

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, selectedGender }));
    setSelectedGender(null);
    setOpenSelectGender(false);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (product.name.includes("Fish") && !selectedGender) {
      setOpenSelectGender(true);
    } else {
      handleAddToCart();
    }
  };

  return (
    <motion.div
      className={`${className} relative p-2 max-w-[170px] flex-shrink-0 drop-shadow-sm lg:max-w-[300px]`}
      onClick={onClick}
    >
      <div className="relative bg-white rounded-2xl p-2 w-full flex flex-col h-full">
        <img
          src="https://placehold.co/600x400/000000/FFFFFF/png"
          alt={product.name}
          className="rounded-xl w-full object-cover"
        />
        <div className="flex flex-col p-2 justify-between divide-y divide-gray-200 h-full">
          <h3 className="text-center">{product.name}</h3>

          {product.inStock ? (
            <>
              <div className="flex justify-between items-center my-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      aria-hidden="true"
                      className={`${
                        product.rating > index
                          ? "text-gray-900"
                          : "text-gray-200"
                      } size-4 shrink`}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm font-medium">
                  {product.ratingCount}
                </p>
              </div>
              <div className="flex justify-between items-end mt-auto pt-[5px]">
                <div>
                  {product.discount ? (
                    <>
                      <p className="line-through text-red-500 text-xs">
                        {product.price}
                      </p>
                      <p>{product.discountedPrice}</p>
                    </>
                  ) : (
                    <p>{product.price}</p>
                  )}
                </div>

                <AnimatePresence>
                  {openSelectGender && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute inset-0 backdrop-blur-xs flex items-center justify-center rounded-[18px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div ref={panelRef} className="p-4">
                        <RadioGroup
                          value={selectedGender}
                          onChange={setSelectedGender}
                          className="grid grid-cols-2 gap-4"
                        >
                          <RadioButton
                            value="female"
                            label="F"
                            checked={selectedGender === "female"}
                            onChange={() => setSelectedGender("female")}
                            inStock={product.femalesInStock}
                          />
                          <RadioButton
                            value="male"
                            label="M"
                            checked={selectedGender === "male"}
                            onChange={() => setSelectedGender("male")}
                            inStock={product.malesInStock}
                          />
                        </RadioGroup>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 max-w-[170px] flex-shrink-0 drop-shadow-sm bg-dark-green text-offwhite rounded-lg"
                  onClick={handleCartClick}
                >
                  <ShoppingCartIcon className="size-6" />
                </motion.div>
              </div>
            </>
          ) : (
            <>
              <p className="flex text-red-500 items-center justify-center text-sm lg:text-lg">
                OUT OF STOCK
              </p>
              <div className="flex justify-center mt-auto pt-[5px]">
                <div>
                  {product.discount ? (
                    <>
                      <p className="line-through text-red-500 text-xs">
                        {product.price}
                      </p>
                      <p>{product.discountedPrice}</p>
                    </>
                  ) : (
                    <p>{product.price}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
