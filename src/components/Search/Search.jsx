import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { closeSearch } from "../../redux/searchBarSlice";
import { updateQuery } from "../../redux/searchSlice";
import { useFetch } from "../../hooks/useFetch";
import { getUrl } from "../../api/data";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchProduct } from "../SearchProduct/SearchProduct";

export function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.searchBar.isOpen);
  const query = useSelector((state) => state.search.query);
  const [fetchUrl, setFetchUrl] = useState(null);

  useEffect(() => {
    setFetchUrl(query.length >= 2 ? getUrl({ search: true, query }) : null);
  }, [query]);

  const { data, loading, error } = useFetch(fetchUrl);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(closeSearch());
    dispatch(updateQuery(""));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(closeSearch())}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-xs" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="fixed top-[150px] p-2 w-full max-w-md text-left transition-all">
                <div className="relative bg-offwhite rounded-[18px] shadow-xl">
                  <input
                    value={query}
                    onChange={(e) => dispatch(updateQuery(e.target.value))}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSearchSubmit(e)
                    }
                    placeholder="Search for products, categories..."
                    className="w-full rounded-[18px] bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm pr-10"
                  />
                  <MagnifyingGlassIcon
                    className="absolute h-full w-1/5 p-2 text-offwhite right-0 top-1/2 -translate-y-1/2 bg-linear-to-l from-dark-green to-transparent rounded-[18px]"
                    onClick={handleSearchSubmit}
                  />
                </div>
                <div className="relative z-10 mt-2 w-full rounded-[18px] bg-white shadow-lg ring-1 ring-black/5">
                  <ul className="max-h-60 overflow-auto py-1 text-sm text-gray-900 no-scrollbar">
                    {loading && (
                      <li className="px-4 py-2 text-gray-500">Loading...</li>
                    )}
                    {error || !fetchUrl || !data ? (
                      <li className="px-4 py-2 text-gray-500">
                        No products found.
                      </li>
                    ) : (
                      <AnimatePresence>
                        {Object.values(data).map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer px-4"
                          >
                            <NavLink
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/products/${item.id}`);
                                dispatch(closeSearch());
                              }}
                            >
                              <SearchProduct product={item} />
                            </NavLink>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </ul>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
