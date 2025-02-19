import React, { useEffect } from "react";
import imggGup from "../assets/Images/Imagine_Gup.jpg";
import imgBetta from "../assets/Images/Imagine_Betta_Care.jpg";
import imgPlants from "../assets/Images/Imagine_Stoffels_Plante.jpg";
import {
  BannerSlider,
  ProductSlider,
  CategoryCard,
  Loader,
} from "../components";
import { useFetch } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { getUrl } from "../api/data";
import { initializeSubcategories } from "../redux/subcategoriesSlice";

const sliderImg = [
  {
    img: imggGup,
    alt: "Guppys",
    brand: "TheFishHub",
    text: "Check out our guppy variety",
  },
  {
    img: imgBetta,
    alt: "Betta Care Products",
    brand: "Dennerle",
    text: "Look at the brand new Betta care products",
  },
  {
    img: imgPlants,
    alt: "Natural Aquarium Plants",
    brand: "Stoffels",
    text: "Natural Aquarium Plants",
  },
];

export function LandingPage() {
  const url = getUrl();
  const dispatch = useDispatch();
  const subcategories = useSelector((state) => state.subcategories);

  const { data, loading, error } = useFetch(url);

  return (
    <div className="">
      <Loader loading={loading} />
      <BannerSlider banners={sliderImg} />
      <p className="p-2 text-center text-lg font-medium">
        Check out our products:
      </p>
      <div className="grid grid-cols-1 gap-2 place-items-center p-2 xs:grid-cols-2 xs:gap-2 max-w-[1200px] mx-auto">
        {subcategories &&
          Object.keys(subcategories).map((category, index) => (
            <CategoryCard category={category} key={index} className=" " />
          ))}
      </div>
      <ProductSlider
        data={data}
        type="discount"
        discount="40"
        category="freshWater"
        subcategory="Fish"
      />
      <ProductSlider
        data={data}
        type="discount"
        discount="20"
        category="saltWater"
        subcategory="Fish"
      />
      <ProductSlider
        data={data}
        type="discount"
        discount="10"
        category="terrariums"
        subcategory="Terrariums"
      />
    </div>
  );
}
