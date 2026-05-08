import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Theme } from "../GlobalStyles";

const TextSlider = () => {
  const texts = [
    "Flat 20% OFF on all products",
    "Free Shipping Above ₹499",
    "New Arrivals Available Now",
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#fb6900",
        height: "2.5rem",
        width: "100%",
        overflow: "hidden",

        "& .swiper": {
          height: "100%",
        },

        "& .swiper-button-prev": {
          color: "#000",
          backgroundColor: "#fff",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          padding: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",

          position: "absolute",
          left: "400px !important",
          top: "40px",
          transform: "translateY(-50%)",
          zIndex: 10,
        },

        "& .swiper-button-next": {
          color: "#000",
          backgroundColor: "#fff",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          padding: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",

          position: "absolute",
          right: "400px !important",
          top: "40px",
          transform: "translateY(-50%)",
          zIndex: 10,
        },

        "& .swiper-button-next:after, & .swiper-button-prev:after":
          {
            fontSize: "12px",
            fontWeight: "bold",
          },
      }}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
      >
        {texts.map((text, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: Theme.font16Regular,
                fontSize: "14px",
                textAlign: "center",
                px: 4,
              }}
            >
              {text}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TextSlider;