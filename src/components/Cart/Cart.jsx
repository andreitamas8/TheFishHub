import { useDispatch, useSelector } from "react-redux";
import { CartProduct } from "../CartProduct/CartProduct";
import { capitalizeFirstLetter } from "../../assets";
import {
  selectTotalDiscountedPrice,
  selectTotalPrice,
  selectTotalQuantity,
} from "../../redux/cartItemsSlice";

import { useNavigate } from "react-router-dom";
import { closeCart } from "../../redux/popoverCartSlice";
import { Button } from "../Button/Button";

export function Cart({ reason = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const cartQuatity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const totalDiscountedPrice = useSelector(selectTotalDiscountedPrice);
  const handleCartClose = () => {
    dispatch(closeCart());
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (reason === "cart") {
      const timer = setTimeout(() => handleCartClose(), 300);
      navigate(`/${reason}`);
      return () => clearTimeout(timer);
    } else {
      navigate(`/${reason}`);
    }
  };
  return (
    <>
      {cartItems
        ? cartItems.map((prodct, index) => (
            <div key={index}>
              <CartProduct product={prodct} />
            </div>
          ))
        : null}
      {cartQuatity !== 0 ? (
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            {totalDiscountedPrice ? (
              <div>
                <p className="text-center">${totalDiscountedPrice}</p>
                <p className="text-red-500 text-sm text-center line-through">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            ) : (
              <p>${totalPrice}</p>
            )}
          </div>
          {reason && (
            <div className="mt-6">
              <Button title={`Go to ${reason}`} handleClick={handleClick} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-center p-10">
          <p className="text-nowrap text-lg mb-3">No products in cart!</p>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="font-medium text-dark-green"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </div>
      )}
    </>
  );
}
