import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  useClose,
} from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { useFetch } from "../../hooks";
import { getUrl } from "../../api/data";
import { PopoverMenu } from "../PopoverMenu/PopoverMenu";
import { Search } from "../Search/Search";
import { PopoverCart } from "../PopoverCart/PopoverCart";

import logo from "../../assets/Logo/Aquarium Fish Icon Green.svg";
import { openSearch } from "../../redux/searchBarSlice";
import { updateQuery } from "../../redux/searchSlice";
import { openCart } from "../../redux/popoverCartSlice";
import { initializeSubcategories } from "../../redux/subcategoriesSlice";
import {
  clearCart,
  fetchBackendCart,
  setCart,
  updateBackendCart,
} from "../../redux/cartItemsSlice";
import {
  fetchBackendPersonalData,
  login,
  logout,
  setPersonalDataTrue,
  updateBackendPersonalData,
} from "../../redux/userSlice";
import { getCategoryName } from "../../assets";

const navigation = {
  categories: [],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

const API_BASE_URL = "http://localhost:3000/api";
const urlAdress = getUrl();

export function Headerv2() {
  const isPersonalDataSet = useSelector((state) => state.isPersonalDataSet);
  const categories = useSelector((state) => state.categories);
  const userPersonalData = useSelector((state) => state.user.personalData);
  const subcategories = useSelector((state) => state.subcategories);
  const cartItems = useSelector((state) => state.cartItems);
  const isOpen = useSelector((state) => state.searchBar.isOpen);
  const query = useSelector((state) => state.search.query);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { data, loading, error } = useFetch(urlAdress);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user?.name);
  const { data: userData } = useFetch(
    userId ? `${API_BASE_URL}/accounts/${userId}` : null
  );
  const user = useSelector((state) => state?.user);
  const localCart = localStorage.getItem("cart");
  const [isUpdating, setIsUpdating] = useState(false);
  let close = useClose();
  //fetching and updating data from Backend
  const fetchCartData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId) {
      // Dispatch the async thunk to fetch the cart from the backend
      const action = await dispatch(fetchBackendCart({ userId, token }));

      // Handle the result or error
      if (action.meta.requestStatus === "fulfilled") {
      } else {
      }
    }
  };
  const fetchPersonalData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId) {
      // Dispatch the async thunk to fetch the cart from the backend
      const action = await dispatch(
        fetchBackendPersonalData({ userId, token })
      );

      // Handle the result or error
      if (action.meta.requestStatus === "fulfilled") {
        console.log("personal data fetched header");
      } else {
        console.log("error fetch Personal data");
      }
    }
  };
  const updateCartData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token || isUpdating) return;

    setIsUpdating(true);
    const action = await dispatch(
      updateBackendCart({ cart: cartItems, userId, token })
    );

    if (action.meta.requestStatus === "fulfilled") {
    } else {
    }
    setIsUpdating(false);
  };
  const updatePersonalData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token || isUpdating) return;

    setIsUpdating(true);
    const action = await dispatch(
      updateBackendPersonalData({ data: userPersonalData, userId, token })
    );

    if (action.meta.requestStatus === "fulfilled") {
      console.log("personal data updated header");
    } else {
      console.log("error update personal data");
    }
    setIsUpdating(false);
  };
  useEffect(() => {
    fetchCartData();
    fetchPersonalData();
  }, [userId, dispatch]);
  useEffect(() => {
    console.log("Fetched userPersonalData:", userPersonalData);
    if (userPersonalData && Object.keys(userPersonalData).length > 0) {
      updatePersonalData();
      dispatch(setPersonalDataTrue());
    }
  }, [userPersonalData]);

  useEffect(() => {
    updateCartData();
  }, [cartItems, dispatch]);
  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearCart());
    console.log("log");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.setItem("cart", []);
  }
  // subcategories
  useEffect(() => {
    if (data) {
      const subcategoriesWithTitles = Object.entries(data).reduce(
        (acc, [category, subcategories]) => {
          acc[category] = Object.values(subcategories).map(
            (sub) => sub.category
          );
          return acc;
        },
        {}
      );
      dispatch(initializeSubcategories(subcategoriesWithTitles));
    }
  }, [data, dispatch]);
  //userData
  useEffect(() => {
    if (userData) {
      dispatch(
        login({
          userId: userData.id,
          name: userData.username,
          email: userData.email,
          preferences: { theme: userData.preferences.theme },
        })
      );
    }
  }, [userData, dispatch]);

  const handleCategoryRouteChange = (category) =>
    navigate(`/category/${category}`);
  const handleSubcategoryRouteChange = (category, subcategory) =>
    navigate(`/category/${category}/${subcategory}`);
  const handleLogoRouteChange = () => navigate(`/`);
  const handleLoginRouteChange = () => navigate("/login");
  const handleCartOpen = () => dispatch(openCart());
  function handleCreateAccountRouteChange(e) {
    e.preventDefault();
    const timer = setTimeout(() => handlePopoverClose(), 300);
    navigate("/signup");
    return () => clearTimeout(timer);
  }
  const openModal = () => {
    dispatch(updateQuery(""));
    dispatch(openSearch());
  };

  return (
    <div className="bg-offwhite">
      {/* 
      <CartSyncWithLocalStorage /> */}
      <Search />
      <header className="relative bg-offwhite">
        <p className="flex h-10 items-center justify-center bg-oxford-blue px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="relativ flex h-16 items-center justify-between">
              <PopoverMenu
                data={data}
                categories={categories}
                onCategoryRouteChange={handleCategoryRouteChange}
                onSubcategoryRouteChange={handleSubcategoryRouteChange}
              />
              <div className="flex">
                <div className="absolute left-1/2 bottom-1/6 -translate-x-1/2 cursor-pointer lg:relative lg:left-[0px] lg:translate-[0px] lg:ml-3">
                  <a>
                    <span className="sr-only">TheFishHub</span>
                    <img
                      alt="Logo"
                      src={logo}
                      className="h-8 w-auto"
                      onClick={handleLogoRouteChange}
                    />
                  </a>
                </div>
                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {subcategories
                      ? Object.entries(subcategories).map(
                          ([category, subcategoryList]) => (
                            <Popover key={category} className="flex z-50">
                              <div className="relative flex">
                                <PopoverButton className="relative z-100 -mb-px flex cursor-pointer items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-dark-green data-open:text-dark-green">
                                  {getCategoryName(category)}
                                </PopoverButton>
                              </div>
                              <PopoverPanel
                                transition
                                anchor="bottom"
                                className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                              >
                                <div className="relative bg-offwhite">
                                  <div className="mx-auto max-w-7xl px-8 py-8">
                                    <div className="grid grid-cols-3 gap-8 text-sm text-center">
                                      {subcategoryList.map((section) => (
                                        <div key={section}>
                                          <CloseButton
                                            transition
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleSubcategoryRouteChange(
                                                category,
                                                section
                                              );
                                            }}
                                            className="font-medium text-gray-700 cursor-pointer"
                                          >
                                            {section}
                                          </CloseButton>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </PopoverPanel>
                            </Popover>
                          )
                        )
                      : ""}
                  </div>
                </PopoverGroup>
              </div>
              <div className="flex">
                <div className=" px-4 py-6">
                  {isAuthenticated ? (
                    <div className="hidden lg:flex lg:justify-between lg:gap-5">
                      <div
                        className="font-medium text-gray-700 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          const timer = setTimeout(
                            () => handlePopoverClose(),
                            300
                          );
                          navigate("/accountInfo");
                          return () => clearTimeout(timer);
                        }}
                      >
                        <p>
                          <span className=" text-center items-center  font-medium text-gray-700 cursor-pointer text-sm">
                            Hello {userName}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* NavLink
                        onClick={handleLoginRouteChange}
                        className="block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </NavLink>
                      <NavLink
                        onClick={handleCreateAccountRouteChange}
                        className="block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </NavLink> */}
                      <div className="ml-auto flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ">
                          <a
                            onClick={handleLoginRouteChange}
                            className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                          >
                            Sign in
                          </a>
                          <span
                            aria-hidden="true"
                            className="h-6 w-px bg-gray-200"
                          />
                          <a
                            onClick={handleCreateAccountRouteChange}
                            className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                          >
                            Create account
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="ml-auto flex items-center">
                  <div className="flex lg:ml-6 gap-3">
                    {isAuthenticated ? (
                      <div
                        className="flex p-2 text-center items-center font-medium text-gray-700 cursor-pointer text-sm"
                        onClick={handleLogout}
                      >
                        <ArrowRightEndOnRectangleIcon className="size-6 text-gray-400 hover:text-gray-500" />
                      </div>
                    ) : null}

                    <a className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        onClick={openModal}
                        aria-hidden="true"
                        className="size-6"
                      />
                    </a>
                  </div>

                  <PopoverCart />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
