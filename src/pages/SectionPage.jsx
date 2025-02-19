import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { Loader, ProductCard, SubcategorySlider } from "../components";
import { getCategoryName } from "../assets";
import { useDispatch } from "react-redux";
import { getUrl } from "../api/data";

import { motion } from "framer-motion";

export function SectionPage() {
  const productsUrl = getUrl();
  const navigate = useNavigate();
  const { category, subcategory } = useParams();
  const dispatch = useDispatch();

  const { data, loading } = useFetch(productsUrl);

  const categoryData = data ? data[category] : [];

  const subcategoryData = categoryData
    ? categoryData.find((sub) => sub.category === subcategory)
    : null;

  const products = subcategoryData ? subcategoryData.products : [];

  function handleClick(id) {
    navigate(`/products/${id}`);
  }

  return (
    <>
      <Loader loading={loading} />

      <div
        className={`transition-opacity duration-700 ${
          !loading ? "opacity-100" : "opacity-0"
        }`}
      >
        {!loading && data && (
          <>
            <div className="flex justify-center items-center text-2xl p-5">
              <p>{getCategoryName(category)}</p>
            </div>
            <SubcategorySlider
              category={category}
              className="p-2 no-scrollbar lg:p-10"
            />
            <motion.div
              initial={{ x: "-100%" }} // Starts off-screen to the left
              animate={{ x: 0 }} // Animates to the final position
              exit={{ x: "100%" }} // Optional: animate out to the right when exiting
              transition={{ type: "tween", duration: 1, ease: "easeInOut" }} // Customize the transition
              className="max-w-[1200px] mx-auto "
            >
              <div className="flex justify-center items-center text-2xl p-5 ">
                <p>{subcategory}</p>
              </div>
              <div className="grid grid-cols-2 justify-center gap-[5px] lg:grid-cols-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard
                    onClick={() => handleClick(product.id)}
                    product={product}
                    key={product.id}
                    className="w-full h-full"
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}
