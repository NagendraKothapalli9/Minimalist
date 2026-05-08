import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataActionInitiate } from "../redux/actions/getProductAction";
import CustomSlider from "../Components/CustomSlider";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Theme } from "../GlobalStyles";
import HomeCard from "../Components/HomeCard";





const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDataActionInitiate());
  }, [dispatch]);


  const sliderData = useSelector(
    (state) => state.getproductdata.data || []
  );

  console.log("sliderData =>", sliderData);


  const carouselData = sliderData.filter(
    (item) => item.categories === "Carousel"
  );


  const sliderImages = [];

  carouselData.forEach((item) => {
    if (item.img1) sliderImages.push(item.img1);
    if (item.img2) sliderImages.push(item.img2);
    if (item.img3) sliderImages.push(item.img3);
    if (item.img4) sliderImages.push(item.img4);
    if (item.img5) sliderImages.push(item.img5);
  });


  return (
    <Box>
      <Box>
        <CustomSlider
          height="320px"
          images={sliderImages}
          autoplay={true}
          delay={6000}
          showNavigation={true}
          showPagination={true}
          effect="slide"
          sx={{
            marginTop: "20px",
            "& .swiper-pagination-bullet": {
              backgroundColor: "gray",
              opacity: 0.7,
              width: "4px",
              height: "4px",
              margin: "0 8px !important",
            },
          }}
        />
      </Box>
      <Box sx={{ my: 4, ml: 4 }}>
        <Typography sx={{ ...Theme.font30Regular, fontWeight: 'bold', my: 6 }}>Our Best Sellers</Typography>

      </Box>
      <HomeCard />
      <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Button variant="outlined" sx={{ border: '1px solid black', color: 'black', textTransform: 'capitalize', py: 1.5, px: 6, ...Theme.font16Regular, my: 8, mx: "auto" }}>View All Products</Button>
      </Box>
      <Box sx={{ p:{md:4,xs:1} }}>
        <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898213/2500x1080_2_dc0g1m.avif" alt="img" width={'100%'} />
      </Box>
      <Box sx={{  p:{md:4,xs:1}}}>
        <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898248/Try_Now_1_ossehk.avif" alt="img" width={'100%'} />
      </Box>
       <Box sx={{ my: 4, ml: 4 }}>
        <Typography sx={{ ...Theme.font30Regular, fontWeight: 'bold', my: 6 }}>Shop by Category</Typography>

      </Box>
    </Box>
  );
};

export default Home;