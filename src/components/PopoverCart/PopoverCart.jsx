import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { closeCart, openCart } from "../../redux/popoverCartSlice";
import {
  selectTotalQuantity,
  selectTotalPrice,
  selectTotalDiscountedPrice,
} from "../../redux/cartItemsSlice";
import { Cart } from "../Cart/Cart";

export function PopoverCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isCartOpen = useSelector((state) => state.popoverCart.isCartOpen);
  const cartQuantity = useSelector(selectTotalQuantity);

  const handleCartOpen = () => dispatch(openCart());
  const handleCartClose = () => dispatch(closeCart());

  return (
    <>
      {/* Cart Icon */}
      <div className="ml-4 flow-root lg:ml-6">
        <a className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            onClick={(e) => {
              e.preventDefault();
              handleCartOpen();
            }}
            aria-hidden="true"
            className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {cartQuantity}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </a>
      </div>

      {/* Cart Dialog */}
      <Dialog
        open={isCartOpen}
        onClose={handleCartClose}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-700/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    {/* Cart Header */}
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCartClose();
                        }}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <Cart reason="cart" />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
