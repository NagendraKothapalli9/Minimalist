import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataActionInitiate } from "../redux/actions/getProductAction";

import {
  Box,
  Typography,
  Grid,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useTheme } from "@mui/material/styles";
import { Theme } from "../GlobalStyles";

const HomeImage = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getProductDataActionInitiate());
  }, [dispatch]);

  const imageData = useSelector(
    (state) => state.getproductdata.data || []
  );

  const imageitems = imageData.filter(
    (item) => item.categories === "Shop by Category"
  );

  const allCategories = imageitems
    .flatMap((item) => [
      { image: item.img1, name: item.name1 },
      { image: item.img2, name: item.name2 },
      { image: item.img3, name: item.name3 },
      { image: item.img4, name: item.name4 },
      { image: item.img5, name: item.name5 },
    ])
    .filter((item) => item.image);

  const muiTheme = useTheme();

  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

 
  const itemsPerPage = isMobile ? 1 : 4;

  const totalPages = Math.ceil(allCategories.length / itemsPerPage);

  const paginatedItems = allCategories.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 12 }, py: 6 }}>
      
      {/* Heading */}
      <Typography
        sx={{
          ...Theme.font30Regular,
          fontWeight: "bold",
          textAlign: "center",
          mb: 6,
        }}
      >
        Shop by Category
      </Typography>

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center">
        {paginatedItems.map((item, index) => (
          <Grid item xs={12} sm={12} md={3} key={index}>
            <Box textAlign="center">
              
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  maxWidth: "260px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />

              <Typography
                sx={{
                  mt: 2,
                  ...Theme.font16Regular,
                }}
              >
                {item.name}
              </Typography>

            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          gap: 2,
        }}
      >
        
        {/* Left Arrow */}
        <IconButton
          onClick={handlePrev}
          disabled={page === 0}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

      
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setPage(index)}
              sx={{
                width: page === index ? 40 : 18,
                height: 5,
                borderRadius: 10,
                backgroundColor:
                  page === index ? "#111" : "#d0d0d0",
                cursor: "pointer",
                transition: "0.3s",
              }}
            />
          ))}
        </Box>


        <IconButton
          onClick={handleNext}
          disabled={page === totalPages - 1}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>

      </Box>
    </Box>
  );
};

export default HomeImage;