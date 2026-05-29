import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataActionInitiate } from "../redux/actions/getProductAction";
import CustomSlider from "../Components/CustomSlider";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import { Theme } from "../GlobalStyles";
import HomeCard from "../Components/HomeCard";
import HomeImage from "../Components/HomeImage";
import Footer from "../Components/Footer";





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
      <Box sx={{ p: { md: 4, xs: 1 } }}>
        <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898213/2500x1080_2_dc0g1m.avif" alt="img" width={'100%'} />
      </Box>
      <Box sx={{ p: { md: 4, xs: 1 } }}>
        <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898248/Try_Now_1_ossehk.avif" alt="img" width={'100%'} />
      </Box>

      <Box sx={{ my: 4 }}>
        <HomeImage />
      </Box>
      <Box sx={{ my: 4, ml: 4 }}>
        <Typography sx={{ ...Theme.font30Regular, fontWeight: 'bold', my: 6 }}>New Launches</Typography>

      </Box>
      <HomeCard />
      <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Button variant="outlined" sx={{ border: '1px solid black', color: 'black', textTransform: 'capitalize', py: 1.5, px: 6, ...Theme.font16Regular, my: 8, mx: "auto" }}>View All Products</Button>
      </Box>
      <Box >
        <Typography sx={{ ...Theme.font30Regular, fontSize: '36px', textAlign: 'center', fontWeight: '600' }} >The future of personal care is here</Typography>
        <Typography sx={{ ...Theme.font16Regular, textAlign: 'center', mt: 1 }}> Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.</Typography>
      </Box>
      <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'center', mt: 10 }}>
        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>

          <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898247/transparency_erpdod.webp" alt="" height={'60px'} />
          <Typography sx={{ ...Theme.font18SemiBold, my: 1, mt: 2 }}>Transparency</Typography>
          <Typography sx={{ ...Theme.font15Regular, my: 1 }}>Full disclosure of ingredients used & their concentration</Typography>

        </Grid>
        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>

          <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898228/medical-research-256_1_piw2ax.webp" alt="" height={'60px'} />
          <Typography sx={{ ...Theme.font18SemiBold, my: 1, mt: 2 }}>Efficacy</Typography>
          <Typography sx={{ ...Theme.font15Regular, my: 1 }}>Formulations developed in our in-house laboratories</Typography>

        </Grid>
        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>

          <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898214/affordable_zbzgde.webp" alt="" height={'60px'} />
          <Typography sx={{ ...Theme.font18SemiBold, my: 1, mt: 2 }}>Affordable</Typography>
          <Typography sx={{ ...Theme.font15Regular, my: 1 }}>Skincare, accessible to all</Typography>

        </Grid>
        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>

          <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898236/only_the_best_eqftxe.webp" alt="" height={'60px'} />
          <Typography sx={{ ...Theme.font18SemiBold, my: 1, mt: 2 }}>Only the best</Typography>
          <Typography sx={{ ...Theme.font15Regular, my: 1 }}>Ingredients sourced from across the world</Typography>

        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Home;