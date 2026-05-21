import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Typography,
  Container,
  Divider,
  Stack,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
} from "@mui/material";

import { useParams } from "react-router";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import LightBox from "../Components/LightBox";
import CustomLoader from "../Components/CustomeLoader";
import StarRating from "../Components/StarRating";

import { getProductDataActionInitiate } from "../redux/actions/getProductAction";

import { getUserDataActionInitiate } from "../redux/actions/getUserAction";

import { putUserDataActionInitiate } from "../redux/actions/updateUserAction";

import { Theme } from "../GlobalStyles";

import HomeCard from "../Components/HomeCard";

import Footer from "../Components/Footer";

const ProductDetails = () => {
  const { Id } = useParams();

  const dispatch = useDispatch();

  const [loading, setLoading] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const [expanded, setExpanded] =
    useState("panel1");

  /* USER */
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  /* PRODUCTS */
  const getproductsdata =
    useSelector(
      (state) =>
        state.getproductdata
    );

  const d =
    getproductsdata?.data || [];

  const items = d?.find(
    (product) =>
      String(product.id) ===
      String(Id)
  );

  /* USERS */
  const getUsersState =
    useSelector(
      (state) =>
        state.getuserdata
    );

  const usersData =
    getUsersState?.data || [];

  const existingUser =
    usersData.find(
      (item) =>
        item.email === user?.email
    );

  useEffect(() => {
    const fetchData =
      async () => {
        setLoading(true);

        await dispatch(
          getProductDataActionInitiate()
        );

        await dispatch(
          getUserDataActionInitiate()
        );

        setLoading(false);
      };

    fetchData();

    window.scrollTo(0, 0);
  }, [dispatch]);

  /* QUANTITY */
  const handleIncrease = () =>
    setQuantity(
      (prev) => prev + 1
    );

  const handleDecrease = () =>
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );

  /* ACCORDION */
  const handleAccordionChange =
    (panel) =>
      (event, isExpanded) => {
        setExpanded(
          isExpanded
            ? panel
            : false
        );
      };

  /* ADD TO CART */
  const handleAddToCart =
    async () => {
      try {
        const savedUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (!savedUser?.email) {
          alert(
            "Please Login First"
          );

          return;
        }

        const currentUser =
          usersData.find(
            (item) =>
              item.email ===
              savedUser.email
          );

        if (!currentUser?.id) {
          alert(
            "User not found in database"
          );

          return;
        }

        const cartProduct = {
          firebaseKey: Date.now(),

          productId: items?.id,
          productName: items?.Name,
          price: items?.Price,
          mrp: items?.MRP,
          offer: items?.Offer,
          quantity,
          image: items?.img1,
          size: items?.size,
        };

        const existingCart =
          currentUser?.cart || [];

        const alreadyExist =
          existingCart.find(
            (item) =>
              item.productId ===
              items?.id
          );

        let updatedCart = [];

        if (alreadyExist) {
          updatedCart =
            existingCart.map(
              (item) =>
                item.productId ===
                  items?.id
                  ? {
                    ...item,
                    quantity:
                      item.quantity +
                      quantity,
                  }
                  : item
            );
        } else {
          updatedCart = [
            ...existingCart,
            cartProduct,
          ];
        }

        const updatedUser = {
          ...currentUser,
          cart: updatedCart,
        };

        await dispatch(
          putUserDataActionInitiate(
            updatedUser,
            currentUser.id
          )
        );

        await dispatch(
          getUserDataActionInitiate()
        );

        alert(
          "Product Added To Cart"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };

  if (!items && !loading)
    return null;

  const offers = [
    {
      code: "ATC5",
      description:
        "Get Additional 5% Off on orders above ₹499/-",
      bg: "#000",
    },

    {
      code: "B2GSHAMPOO",
      description:
        "Free Maleic Bond Repair Shampoo on any hair product purchase",
      bg: "#000",
    },
  ];

  const accordionStyle = {
    boxShadow: "none",

    borderTop:
      "1px solid #e0e0e0",

    "&:before": {
      display: "none",
    },

    "&.Mui-expanded": {
      margin: 0,
    },
  };

  const summaryStyle = {
    px: 0,

    "& .MuiAccordionSummary-content":
    {
      margin: "20px 0",
    },
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        minHeight: "100vh",
      }}
    >
      <CustomLoader
        open={loading}
        message="Loading product..."
      />

      {/* TOP BANNER */}
      <Box sx={{ width: "100%" }}>
        <img
          src="https://res.cloudinary.com/dam89m7fe/image/upload/v1778562014/pdimg1_dfadnx.avif"
          alt="Banner"
          style={{
            width: "100%",
            display: "block",
            height: "auto",
          }}
        />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          mt: 5,
          pb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              md: "row",
            },

            gap: 6,

            alignItems:
              "flex-start",
          }}
        >
          {/* LEFT IMAGE */}
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                md: "0 0 47%",
              },

              width: "100%",
            }}
          >
            <Box
              sx={{
                position: {
                  md: "sticky",
                },

                top: "20px",
              }}
            >
              <LightBox
                items={items}
              />
            </Box>
          </Box>

          
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                md: "0 0 47%",
              },

              width: "100%",
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="h3"
                sx={{
                  ...Theme.headings,
                }}
              >
                {items?.Name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: 1,
                }}
              >
                <StarRating
                  rating={
                    items?.Rating
                  }
                />

                <Typography
                  sx={{
                    ...Theme.font16SemiBold,
                  }}
                >
                  1773 Reviews
                </Typography>
              </Box>

              <Typography
                sx={{
                  ...Theme.font16SemiBold,
                }}
              >
                {items?.des1}
              </Typography>

              <Typography
                sx={{
                  ...Theme.font16Regular,
                }}
              >
                {items?.des2}
              </Typography>

              <Divider />

             
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {[
                  "Fragrance free",
                  "Non-comedogenic",
                  "White cast free",
                  "pH: 6.0 - 7.0",
                ].map((f) => (
                  <Box
                    key={f}
                    sx={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      minWidth:
                        "20%",
                    }}
                  >
                    <CheckIcon
                      sx={{
                        fontSize:
                          "18px",
                        mr: 1,
                        color:
                          "#000",
                      }}
                    />

                    <Typography
                      sx={{
                        ...Theme.font15Regular,
                      }}
                    >
                      {f}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                size="small"
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  borderRadius: "4px",
                  "&:hover": {
                    bgcolor: "#222",
                  },
                  ...Theme.font16Regular,
                  fontSize: {
                    xs: "12px",
                    md: "16px",
                  },
                  mb: 4,
                  mt: 1,
                  width: {
                    md: "60%",
                    xs: "100%",
                  },
                }}
              >
                Get ₹18 worth of MCash
                post-delivery.
              </Button>

           
              <Box
                sx={{
                  border:
                    "1px solid #d9d9d9",
                  borderRadius: 2,
                  p: 3,
                  position:
                    "relative",
                }}
              >
                <Typography
                  sx={{
                    ...Theme.font15Regular,
                    position:
                      "absolute",
                    top: -12,
                    left: 15,
                    bgcolor: "#fff",
                    px: 1,
                    borderBottom:
                      "1px solid silver",
                  }}
                >
                  CHOOSE VARIANTS
                </Typography>

                <Typography
                  sx={{
                    ...Theme.font15SemiBold,
                    mb: 2,
                  }}
                >
                  Select Size
                </Typography>

                <Box
                  sx={{
                    border:
                      "2px solid #000",
                    width:
                      "fit-content",
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{
                      ...Theme.font15SemiBold,
                    }}
                  >
                    {items?.size}
                  </Typography>
                </Box>
              </Box>

              {/* PRICE */}
              <Box
                sx={{
                  border:
                    "1px solid #d9d9d9",

                  borderRadius: 2,

                  p: 3,

                  position:
                    "relative",
                }}
              >
                <Typography
                  sx={{
                    ...Theme.font15Regular,

                    position:
                      "absolute",

                    top: -12,

                    left: 15,

                    bgcolor: "#fff",

                    px: 1,

                    borderBottom:
                      "1px solid silver",
                  }}
                >
                  PRICE
                </Typography>

                <Box
                  sx={{
                    display: "flex",

                    alignItems:
                      "center",

                    flexWrap:
                      "wrap",

                    gap: 1.5,

                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      ...Theme.font16SemiBold,
                    }}
                  >
                    MRP
                  </Typography>

                  <Typography
                    sx={{
                      ...Theme.font18SemiBold,

                      textDecoration:
                        "line-through",

                      color:
                        "#757575",
                    }}
                  >
                    ₹ {items?.MRP}
                  </Typography>

                  <Typography
                    sx={{
                      ...Theme.font36SemiBold,

                      fontSize: {
                        xs: "28px",
                        md: "36px",
                      },
                    }}
                  >
                    ₹ {items?.Price}
                  </Typography>

                  <Typography
                    sx={{
                      ...Theme.font15Regular,

                      bgcolor:
                        "#000",

                      color:
                        "#fff",

                      px: 1,

                      py: 0.5,
                    }}
                  >
                    {
                      items?.Offer
                    }
                    % Off
                  </Typography>

                  <InfoOutlinedIcon
                    sx={{
                      fontSize: 22,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    ...Theme.font14Regular,

                    color:
                      "#757575",
                  }}
                >
                  (incl. of all
                  taxes)
                </Typography>
              </Box>

              {/* QUANTITY + ADD */}
              <Box
                sx={{
                  display: { xs: 'grid', md: 'flex' },
                  gap: 2,
                  alignItems:
                    "stretch",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    border: "1px solid #d9d9d9",
                    borderRadius: 1,
                    overflow: "hidden",
                    
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: { xs: "180px", sm: "none" },
                  }}
                >
                  <IconButton
                    onClick={handleDecrease}
                    sx={{
                      borderRadius: 0,
                      
                      p: { xs: 1, sm: 1.2, md: 1.5 },
                      flex: { xs: 1, sm: "initial" }
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Box
                    sx={{
                    
                      width: { xs: "60px", sm: "80px", md: "100px" },
                      textAlign: "center",
                      borderLeft: "1px solid #d9d9d9",
                      borderRight: "1px solid #d9d9d9",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        ...Theme.font16SemiBold,
                       
                        fontSize: { xs: "14px", sm: "15px", md: "16px" }
                      }}
                    >
                      {quantity}
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={handleIncrease}
                    sx={{
                      borderRadius: 0,
                      p: { xs: 1, sm: 1.2, md: 1.5 },
                      flex: { xs: 1, sm: "initial" }
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Button
                  fullWidth
                  onClick={
                    handleAddToCart
                  }
                  sx={{
                    bgcolor:
                      "#000",

                    color: "#fff",

                    borderRadius: 1,

                    px: 8,

                    fontWeight: 600,


                    fontSize: { xs: '12px' },

                    "&:hover": {
                      bgcolor:
                        "#222",
                    },
                  }}
                >
                  ADD TO CART
                </Button>

              </Box>

              {/* ACCORDIONS */}
              <Box sx={{ mt: 4 }}>
                <Accordion
                  expanded={
                    expanded ===
                    "panel1"
                  }
                  onChange={handleAccordionChange(
                    "panel1"
                  )}
                  sx={
                    accordionStyle
                  }
                >
                  <AccordionSummary
                    expandIcon={
                      expanded ===
                        "panel1" ? (
                        <RemoveIcon />
                      ) : (
                        <AddIcon />
                      )
                    }
                    sx={
                      summaryStyle
                    }
                  >
                    <Typography
                      sx={{
                        ...Theme.font16SemiBold,
                      }}
                    >
                      What Makes It
                      Potent?
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      px: 0,
                      pb: 3,
                    }}
                  >
                    <List
                      sx={{
                        listStyleType:
                          "disc",

                        pl: 4,
                      }}
                    >
                      {[
                        "Effectively dissolves waterproof makeup and sunscreen...",
                        "Deep cleans without drying...",
                        "Leaves skin soft and comfortable...",
                        "Rich in natural fatty acids...",
                      ].map(
                        (
                          text,
                          i
                        ) => (
                          <ListItem
                            key={i}
                            sx={{
                              display:
                                "list-item",

                              p: 0,

                              mb: 1,

                              ...Theme.font14Regular,
                            }}
                          >
                            {text}
                          </ListItem>
                        )
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* OFFERS */}
      <Box
        sx={{
          mt: 1,
          mb: 4,
          mx: 4,
        }}
      >
        <Typography
          sx={{
            ...Theme.font18SemiBold,
            mb: 2,
          }}
        >
          Offers (
          {offers.length})
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            overflowX: "auto",
            pb: 2,

            "&::-webkit-scrollbar":
            {
              display:
                "none",
            },
          }}
        >
          {offers.map(
            (
              offer,
              index
            ) => (
              <Box
                key={index}
                sx={{
                  minWidth: {
                    xs: "280px",
                    md: "320px",
                  },

                  bgcolor:
                    offer.bg,

                  color:
                    "#fff",

                  p: 3,

                  borderRadius:
                    "12px",

                  position:
                    "relative",

                  display:
                    "flex",

                  flexDirection:
                    "column",

                  minHeight:
                    "100px",

                  "&::before, &::after":
                  {
                    content:
                      '""',

                    position:
                      "absolute",

                    top: "50%",

                    width:
                      "20px",

                    height:
                      "20px",

                    bgcolor:
                      "#fff",

                    borderRadius:
                      "50%",

                    transform:
                      "translateY(-50%)",
                  },

                  "&::before": {
                    left: "-10px",
                  },

                  "&::after": {
                    right:
                      "-10px",
                  },
                }}
              >
                <Box
                  sx={{
                    border:
                      "1px dashed #fff",

                    borderRadius:
                      "4px",

                    px: 1.5,

                    py: 0.5,

                    width:
                      "fit-content",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: 1,
                  }}
                >
                  <ContentCopyIcon
                    sx={{
                      fontSize: 16,
                    }}
                  />

                  <Typography
                    sx={{
                      ...Theme.font14SemiBold,
                    }}
                  >
                    {
                      offer.code
                    }
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    ...Theme.font15Regular,

                    mt: 2,

                    lineHeight: 1.4,
                  }}
                >
                  {
                    offer.description
                  }
                </Typography>
              </Box>
            )
          )}
        </Stack>
      </Box>

      {/* HOW IT WORKS */}
      <Box
        sx={{
          mt: 4,
          py: 5,
          px: 5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            ...Theme.font30SemiBold,
            mb: 2,
          }}
        >
          How It Works?
        </Typography>

        <Typography
          sx={{
            ...Theme.font16Regular,
            color: "#666",
            mb: 6,
          }}
        >
          The principle is
          <strong>
            {" "}
            "Like dissolves
            Like"
          </strong>
          ...
        </Typography>

        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              md: "row",
            },

            gap: 8,

            alignItems:
              "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: "40%",
            }}
          >
            <img
              src="https://res.cloudinary.com/dam89m7fe/image/upload/v1778756707/how_to_use_ykt7i3.avif"
              alt="Illustration"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 2,
              width: "100%",
            }}
          >
            <Stack spacing={4}>
              <Box>
                <Typography
                  sx={{
                    ...Theme.font18SemiBold,
                    mb: 1,
                  }}
                >
                  1. Dissolution
                </Typography>

                <Typography
                  sx={{
                    ...Theme.font15Regular,
                    color: "#444",
                    mb: 2,
                  }}
                >
                  Lipophilic
                  molecules dissolve
                  oil-based
                  components...
                </Typography>

                <Divider
                  sx={{
                    borderColor:
                      "#000",
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    ...Theme.font18Regular,
                    color: "black",
                  }}
                >
                  2.
                  Emulsification
                </Typography>
              </Box>

              <Divider
                sx={{
                  borderColor:
                    "#e0e0e0",
                }}
              />

              <Box>
                <Typography
                  sx={{
                    ...Theme.font18Regular,
                    color: "black",
                  }}
                >
                  3. Rinse Off
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* RECOMMENDED */}
      <Box sx={{ px: 4 }}>
        <Typography
          sx={{
            ...Theme.font30Regular,
            fontWeight: "600",
            mb: 4,
          }}
        >
          Recommended
          Products For You
        </Typography>

        <HomeCard />
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductDetails;