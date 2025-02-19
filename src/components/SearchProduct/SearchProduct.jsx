import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../redux/cartItemsSlice";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "../../assets";

export function SearchProduct({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const userId = localStorage.getItem("userId");

  const removeFromCart = (productId) => {
    dispatch(removeItemFromCart(productId)); // Remove item from cart in Redux state
  };
  function handleRemoveClick(id) {
    removeFromCart(id); // Calls remove from cart, triggering the effect above
  }

  return (
    <li key={product.id} className="flex py-6 ">
      <div className="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={product.name}
          src="https://placehold.co/600x400/000000/FFFFFF/png"
          className="size-full object-cover"
        />
      </div>

      <div className="ml-2 flex flex-1 items-center ">
        <h3 className="text-wrap font-medium text-gray-900 ">{product.name}</h3>
        <div className="flex flex-1 flex-col items-end justify-between text-sm">
          {product.discount ? (
            <div className="flex flex-col">
              <p className="ml-2">{product.discountedPrice}</p>
              <p className="ml-2 text-red-500 text-xs line-through">
                {product.price}
              </p>
            </div>
          ) : (
            <p className="ml-4">{product.price}</p>
          )}
        </div>
      </div>
    </li>
  );
}
