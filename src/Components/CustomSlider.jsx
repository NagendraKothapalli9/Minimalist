import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const CustomSlider = ({
  images = [],
  height = "520px",
  width = '100%',
  autoplay = true,
  delay = 9000,
  showNavigation = true,
  showPagination = true,
  effect = "slide",
  rounded = false,
  sx = {},
  style = {},
}) => {
  return (
    <Box
      sx={{
        height,
        width,
        overflow: "visible",
        position: "relative",
        backgroundColor: '',

        "& .custom-slider-image": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: rounded ? "16px" : "0px",
        },

        "& .swiper": {
          width: "100%",
          height: "100%",
        },

        "& .swiper-button-prev": {
          color: "#000",
          backgroundColor: "#fff",
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          padding: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",

          position: "absolute",
          left: "20px !important",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        },

        "& .swiper-button-next": {
          color: "#000",
          backgroundColor: "#fff",
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          padding: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",

          position: "absolute",
          right: "20px !important",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        },

        "& .swiper-button-next:after, & .swiper-button-prev:after": {
          fontSize: "16px",
          fontWeight: "bold",
        },

        "& .swiper-pagination-bullet": {
          backgroundColor: "gray",
          opacity: 0.7,
          width: "5px",
          height: "5px",
          margin: "0 6px",
        },

        "& .swiper-pagination-bullet-active": {
          backgroundColor: "#000000",
          opacity: 1,
        },

        ...sx,
      }}
    >
      <Swiper
        modules={[
          Navigation,
          Pagination,
          ...(autoplay ? [Autoplay] : []),
          EffectFade,
        ]}
        navigation={showNavigation}
        pagination={
          showPagination
            ? { clickable: true }
            : false
        }
        autoplay={
          autoplay
            ? {
              delay: delay,
              disableOnInteraction: false,
            }
            : undefined
        }
        loop={images.length > 1}
        speed={800}
        effect={effect}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`slide-${index}`}
              className="custom-slider-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CustomSlider;