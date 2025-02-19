import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../redux/cartItemsSlice";
import { capitalizeFirstLetter } from "../../assets";

export function CartProduct({ product }) {
  const dispatch = useDispatch();

  const removeFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };
  function handleRemoveClick(id) {
    removeFromCart(id);
  }

  return (
    <li key={product.id} className="flex py-6">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={product.name}
          src="https://placehold.co/600x400/000000/FFFFFF/png"
          className="size-full object-cover"
        />
      </div>

      <div className="ml-2 flex flex-1 ">
        <div className="flex flex-col justify-between font-medium text-gray-900 space-y-2">
          <h3 className="text-wrap">{product.name}</h3>
          {product?.selectedGender ? (
            <p className="text-gray-500 text-sm">
              {capitalizeFirstLetter(product.selectedGender)}
            </p>
          ) : (
            ""
          )}
          <p className="text-gray-500 text-sm">Qty {product.quantity}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
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
          <div className="flex">
            <button
              type="button"
              className="font-medium text-red-500"
              onClick={() => handleRemoveClick(product.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
