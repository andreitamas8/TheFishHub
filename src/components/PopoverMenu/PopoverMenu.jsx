import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  Bars3Icon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryName } from "../../assets";
import { closePopover, openPopover } from "../../redux/popoverMenuSlice";

export function PopoverMenu({
  onCategoryRouteChange,
  onSubcategoryRouteChange,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.popoverMenu.isOpen);
  const subcategories = useSelector((state) => state.subcategories);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const userName = useSelector((state) => state.user?.name);

  const handlePopoverOpen = () => dispatch(openPopover());
  const handlePopoverClose = () => dispatch(closePopover());

  const handleRouteChange = (callback, ...args) => {
    setTimeout(() => {
      handlePopoverClose();
      callback(...args);
    }, 300);
  };
  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearCart());
    console.log("log");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.setItem("cart", []);
  }

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: "0%", transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { x: "-100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={handlePopoverOpen}
        className="relative rounded-[18px] bg-offwhite p-2 text-gray-400 lg:hidden"
      >
        <span className="sr-only">Open menu</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>

      {/* Menu Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => {}}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-700/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

        <div className="fixed inset-0 z-40 flex">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onAnimationComplete={() => {
                  if (!isOpen) dispatch(closePopover());
                }}
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
              >
                <DialogPanel>
                  {/* Close Button */}
                  <button
                    onClick={handlePopoverClose}
                    className="m-4 p-2 text-gray-400 rounded-md"
                  >
                    <XMarkIcon className="size-6" />
                  </button>

                  {/* Categories */}
                  <div className="mt-6 px-4">
                    {subcategories ? (
                      Object.entries(subcategories).map(
                        ([category, subcategoryList]) => (
                          <Disclosure key={category}>
                            {({ open }) => (
                              <>
                                <DisclosureButton className="flex w-full justify-between py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                                  <span
                                    onClick={() =>
                                      handleRouteChange(
                                        onCategoryRouteChange,
                                        category
                                      )
                                    }
                                  >
                                    {getCategoryName(category)}
                                  </span>
                                  <ChevronDownIcon
                                    className={`size-5 transition-transform ${
                                      open ? "rotate-180" : ""
                                    }`}
                                  />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 space-y-2">
                                  {Array.isArray(subcategoryList) ? (
                                    subcategoryList.map((subcat) => (
                                      <button
                                        key={subcat}
                                        className="block w-full text-left py-2 pl-6 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                                        onClick={() =>
                                          handleRouteChange(
                                            onSubcategoryRouteChange,
                                            category,
                                            subcat
                                          )
                                        }
                                      >
                                        {subcat}
                                      </button>
                                    ))
                                  ) : (
                                    <div className="text-gray-500">
                                      No subcategories
                                    </div>
                                  )}
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )
                    ) : (
                      <div className="text-gray-500">Loading categories...</div>
                    )}
                  </div>

                  {/* Authentication Links */}
                  <div className="mt-6 border-t border-gray-200 px-4 py-6">
                    {isAuthenticated ? (
                      <div className="flex justify-between">
                        <div
                          className="font-medium"
                          onClick={() =>
                            handleRouteChange(navigate, "/accountInfo")
                          }
                        >
                          <p>
                            <span className="text-md">Hello </span>
                            {userName}
                          </p>
                        </div>
                        <div
                          className="flex text-center gap-[10px]"
                          onClick={handleLogout}
                        >
                          <p>Logout</p>
                          <ArrowRightEndOnRectangleIcon className="size-6" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <NavLink
                          onClick={(e) => handleRouteChange(navigate, "/login")}
                          className="block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </NavLink>
                        <NavLink
                          onClick={(e) =>
                            handleRouteChange(navigate, "/signup")
                          }
                          className="block p-2 font-medium text-gray-900"
                        >
                          Create account
                        </NavLink>
                      </>
                    )}
                  </div>
                </DialogPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Dialog>
    </>
  );
}
