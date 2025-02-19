import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  LightBulbIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../../assets/Logo/Aquarium Fish Icon Green.svg";
import { useFetch } from "../../hooks";
import { NavLink, useNavigate } from "react-router-dom";

export function Header() {
  const urlAdress = "http://localhost:3000/api/products";
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, loading, error } = useFetch(urlAdress);
  const navigate = useNavigate();
  const popoverRef = useRef(null); // Ref to control the Popover programmatically

  function getCategoryName(category) {
    switch (category) {
      case "freshWater":
        return "Fresh Water";

      case "saltWater":
        return "Salt Water";

      case "terrariums":
        return "Terrariums";

      case "lakesAndPonds":
        return "Lakes And Ponds";

      default:
        return "";
    }
  }
  if (data) {
    console.log(data);
    console.log(categories);
  }
  function handleSubcategoryRouteChange(category, subcategory) {
    navigate(`/section/${category}/${subcategory}`);
  }
  function handleLogoRouteChange() {
    navigate(`/`);
  }
  function handleLoginRouteChange() {
    navigate("/login");
  }

  useEffect(() => {
    if (data) {
      const categoryList = Object.keys(data);
      setCategories(categoryList);
    }
  }, [data]);

  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>; // Or display a loading spinner
  }
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 transition-all duration-500 lg:px-8 lg:transition-all  lg:duration-500 "
      >
        <div className="flex lg:flex-1">
          <a className="-m-1.5 p-1.5">
            <span className="sr-only">The Fish Hub</span>
            <img
              alt=""
              src={logo}
              className="h-10 w-auto"
              onClick={() => handleLogoRouteChange()}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {categories.length > 0 ? (
          <PopoverGroup className="hidden lg:flex lg:gap-x-8 ">
            {categories.map((category) => {
              return (
                <Popover className="relative" key={category}>
                  <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                    {getCategoryName(category)}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                  </PopoverButton>

                  <PopoverPanel
                    transition
                    className={`absolute ${
                      (category === "freshWater" || category === "saltWater") &&
                      "-left-8"
                    }
                      ${category === "terrariums" && "-left-[450px]"}
                      ${
                        category === "lakesAndPonds" && "-left-[410px]"
                      } top-full z-10 mt-3 w-screen max-w-xl overflow-scroll rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in`}
                  >
                    {({ close }) => (
                      <div className="p-4 grid grid-cols-3 gap-4">
                        {data[category].map((subcategory) => (
                          <div
                            key={subcategory.category}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                          >
                            <div className="flex-auto">
                              <a
                                className="block font-semibold text-gray-900 flex justify-center text-center"
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent default link behavior
                                  handleSubcategoryRouteChange(
                                    category,
                                    subcategory.category
                                  );
                                  close();
                                }}
                              >
                                {subcategory.category}
                                <span className="absolute inset-0" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </PopoverPanel>
                </Popover>
              );
            })}
          </PopoverGroup>
        ) : (
          <div>Loading categories...</div>
        )}

        <div className="hidden cursor-pointer lg:flex lg:flex-1 lg:justify-end">
          <a
            className="text-sm/6 font-semibold text-gray-900"
            onClick={() => handleLoginRouteChange()}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="xl:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {categories.length > 0 ? (
                  categories.map((category) => {
                    return (
                      <Disclosure as="div" className="-mx-3" key={category}>
                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          <NavLink
                            to={`/section/${category}`}
                            activeClassName="text-lime-800"
                          >
                            {getCategoryName(category)}
                          </NavLink>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 flex-none group-data-[open]:rotate-180"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {data[category].map((subcategory) => (
                            <DisclosureButton
                              key={subcategory.category}
                              as="a"
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                              onClick={() =>
                                handleSubcategoryRouteChange(
                                  category,
                                  subcategory.category
                                )
                              }
                            >
                              {subcategory.category}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    );
                  })
                ) : (
                  <div>Loading categories...</div>
                )}
              </div>
              <div className="py-6">
                <a
                  onClick={() => handleLoginRouteChange()}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
