import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { SubcategoryCard, Loader } from "../components";
import { getCategoryName } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUrl } from "../api/data";
import { motion } from "framer-motion";

export function CategoryPage() {
  const navigate = useNavigate();
  const productsUrl = getUrl();
  const { category } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useFetch(productsUrl);
  const subcategories = useSelector((state) => state.subcategories);

  function handleClick(subcategory) {
    navigate(`/category/${category}/${subcategory}`);
  }
  const selectedCategory = category ? subcategories[category] : null;

  return (
    <>
      <Loader loading={loading} />
      <motion.div
        initial={{ x: "-100%" }} // Starts off-screen to the left
        animate={{ x: 0 }} // Animates to the final position
        exit={{ x: "100%" }} // Optional: animate out to the right when exiting
        transition={{ type: "tween", duration: 1, ease: "easeInOut" }} // Customize the transition\
        className="max-w-[1200px] mx-auto"
      >
        <div
          className={`transition-opacity duration-700 ${
            !loading ? "opacity-100" : "opacity-0"
          }`}
        >
          {!loading && (
            <>
              <div className="flex justify-center items-center text-2xl p-5">
                <p>{getCategoryName(category)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2">
                {selectedCategory &&
                  selectedCategory.map((subcategory, index) => (
                    <SubcategoryCard
                      category={subcategory}
                      key={index}
                      onClick={() => handleClick(subcategory)}
                      className="content-center text-lg"
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
