import Slider from "react-slick";
import "./styles.css";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { motion } from "framer-motion";

export function BannerSlider({ banners }) {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ChevronRightIcon
        className={className}
        style={{
          ...style,
          color: "white",
          right: "20px",
          zIndex: "1",
          height: "25px",
          width: "25px",
          strokeWidth: "2",
        }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ChevronLeftIcon
        className={`${className} `}
        style={{
          ...style,

          color: "white",
          left: "20px",
          zIndex: "1",
          height: "25px",
          width: "25px",
          strokeWidth: "2",
        }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    centerMode: true,
    arrows: true,
    centerPadding: "200px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 7000,
    speed: 2500,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "0",
          arrows: false,
          autoplay: true,
          dots: false,
          infinite: true,
        },
      },
    ],
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  return (
    <div className="relative slider-container mx-auto rounded-[18px] banner-container">
      <Slider {...settings}>
        {banners.map((img) => (
          <motion.div
            key={img.img}
            whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
          >
            <div className="relative transition-all slideGrow p-4 drop-shadow-sm">
              <img
                src={img.img}
                alt={img.alt}
                className="rounded-[18px] w-full h-auto z-10 "
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent m-4 rounded-[18px] "></div>
              {img?.text && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-50 p-4 cursor-pointer  "
                  style={{ pointerEvents: "auto" }}
                >
                  <h1 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-3xl xl:text-5xl 2xl:text-8xl font-bold px-6">
                    {img.text}
                  </h1>
                  <p className="mt-2 lg:mt-4 text-sm sm:text-sm md:text-base xl:text-lg xl:text-2xl 2xl:text-5xl">
                    {img.brand}
                  </p>
                  {/* <div className="absolute">
                  <ColorButton variant="contained">Check it out</ColorButton>
                </div> */}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
}
