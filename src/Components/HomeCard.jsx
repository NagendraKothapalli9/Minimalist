import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataActionInitiate } from "../redux/actions/getProductAction";
import CustomSlider from "../Components/CustomSlider";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import StarRating from "../Components/StarRating";
import { Theme } from "../GlobalStyles";

const HomeCard = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getProductDataActionInitiate());
  }, [dispatch]);

  const sliderData = useSelector(
    (state) => state.getproductdata.data || []
  );

  const carditems = sliderData.filter(
    (item) => item.categories === "Our Best Sellers"
  );

  
  const getItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 600) return 1;        // mobile
    if (width < 960) return 1;        // tablet
    return 4;                         // laptop / desktop
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

 
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(carditems.length / itemsPerPage);

  const paginatedItems = carditems.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

 
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>

                {paginatedItems.map((item) => (
                    <Card key={item.id} sx={{ width: '300px', mx: "auto" }}>
                        <CustomSlider
                            height="450px"
                            width="100%"
                            objectFit="cover"
                            images={[
                                item.img1,
                                item.img2,
                                item.img3,
                                item.img4,
                                item.img5,
                            ].filter(Boolean)}
                            autoplay={false}
                            showNavigation={true}
                            showPagination={true}
                            effect="slide"
                            sx={{
                                "& .swiper-slide": {
                                    overflow: "hidden",
                                },
                                "& .custom-slider-image": {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.4s ease",
                                },
                                "& .swiper-slide:hover .custom-slider-image": {
                                    transform: "scale(1.03)",
                                },
                                "& .swiper-button-prev": {
                                    color: "#000",
                                    backgroundColor: "#fff",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    padding: "8px",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                                    position: "absolute",
                                    left: "10px !important",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 10,
                                },
                                "& .swiper-button-prev:hover": {
                                    backgroundColor: "#000",
                                    color: "#fff",
                                },
                                "& .swiper-button-next:hover": {
                                    backgroundColor: "#000",
                                    color: "#fff",
                                },
                                "& .swiper-button-next": {
                                    color: "#000",
                                    backgroundColor: "#fff",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    padding: "8px",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                                    position: "absolute",
                                    right: "10px !important",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 10,
                                },
                            }}
                        />

                        <CardContent>
                            <Typography gutterBottom component="div" sx={{
                                ...Theme.font18Regular,
                                fontWeight: '800',
                                position: "relative",
                                display: "inline-block",
                                cursor: "pointer",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    bottom: -1,
                                    width: "100%",
                                    height: "1px",
                                    backgroundColor: "black",
                                    transform: "scaleX(0)",
                                    transformOrigin: "left",
                                    transition: "transform 0.3s ease",
                                },
                                "&:hover::after": {
                                    transform: "scaleX(1)",
                                },
                            }}>
                                {item.Name}
                            </Typography>

                            <Typography variant="body2" sx={{ ...Theme.font15Regular, color: '#616161', my: 1 }}>
                                {item.des}
                            </Typography>

                            <StarRating rating={item.Rating} />

                            <Typography variant="body2" sx={{ ...Theme.font15SemiBold, color: '#000000', my: 2 }}>
                                On Sale from ₹ {item.Price}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button fullWidth sx={{ backgroundColor: '#000000', p: 1.6, color: 'white', textTransform: 'capitalize' }}>
                                Select Size
                            </Button>
                        </CardActions>
                    </Card>
                ))}

            </Box>
      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Box
            key={index}
            onClick={() => setPage(index)}
            sx={{
              width: page === index ? 32 : 18,
              height: 5,
              borderRadius: 10,
              backgroundColor: page === index ? "#111" : "#d0d0d0",
              mx: 0.5,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default HomeCard;