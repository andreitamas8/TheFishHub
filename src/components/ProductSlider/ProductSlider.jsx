import { useRef } from "react";

import { capitalizeFirstLetter, getCategoryName } from "../../assets";
import { ProductCard } from "../";
import { useNavigate } from "react-router-dom";

export function ProductSlider({
  data,
  type,
  discount = "",
  category = "",
  subcategory = "",
}) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const categoryData = data && category ? data[category] : null;

  const products = categoryData
    ? categoryData.flatMap((cat) => {
        if (cat.category.toLowerCase() === subcategory.toLowerCase()) {
          const filteredProducts = cat.products.filter(
            (prod) => prod.discount == discount
          );
          return filteredProducts;
        }
        return [];
      })
    : [];
  function handleClick(id) {
    navigate(`/products/${id}`);
  }

  return (
    <div className="relativ overflow-x-auto ">
      {data && discount && category && subcategory && type ? (
        <div className="p-3 text-sm xs:text-lg px-[70px]">
          <span className="text-red-500 text-md xs:text-lg">{`-${discount}%`}</span>{" "}
          {`${type.toLocaleLowerCase()} for ${getCategoryName(
            category
          ).toLocaleLowerCase()} ${subcategory.toLocaleLowerCase()}`}
        </div>
      ) : (
        <div>{capitalizeFirstLetter(type)}</div>
      )}
      {data && (
        <div className="relative  mx-auto ">
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex relativ px-[50px] overflow-x-auto  scroll-smooth no-scrollbar "
          >
            {/* Slides */}
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onClick={() => handleClick(product.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
