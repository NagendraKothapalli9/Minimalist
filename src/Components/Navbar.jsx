import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";

import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { Theme } from "../GlobalStyles";
import NavSlider from "./NavSlider";
import LoginModal from "./LoginModal";
import UserProfileModal from "./UserProfile";
import { useNavigate } from "react-router-dom";

const MuiNavbar1 = ({ openCart }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName:
              currentUser.displayName || "",
            photoURL:
              currentUser.photoURL || "",
          };

          setUser(userData);
        } else {
          setUser(null);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const productState = useSelector(
    (state) => state.getproductdata
  );

  const products =
    productState?.data || [];

  const shopProducts =
    products.filter(
      (p) =>
        p?.categories?.toLowerCase() ===
        "shop"
    );

  const bestSellersProducts =
    products.filter(
      (p) =>
        p?.categories ===
        "Best Sellers"
    );

  const babyCareProducts =
    products.filter(
      (p) =>
        p?.categories ===
        "Baby Care"
    );

  const dropdownData = {
    Shop: shopProducts.slice(
      0,
      8
    ),

    "Best Sellers":
      bestSellersProducts.slice(
        0,
        8
      ),

    "Baby Care":
      babyCareProducts.slice(
        0,
        8
      ),
  };

  const skinBodyCareColumns = {
    "Shop by Concern": [
      "Acne",
      "Pigmentation",
      "Dryness",
      "UV Damage",
      "Oiliness",
      "Dullness",
      "Aging",
    ],

    "Shop by Ingredients": [
      "Vitamin C",
      "Niacinamide",
      "Ceramide",
      "Retinol",
      "Salicylic Acid",
    ],

    "Skin Care": [
      "Cleanse",
      "Tone",
      "Treat",
      "Moisturize",
      "SPF",
    ],

    "Body Care": [
      "Body Wash",
      "Lotion",
      "Roll On",
    ],
  };

  const hairCareColumns = {
    "Shop by Concern": [
      "Hair Fall",
      "Damaged Hair",
      "Dandruff",
      "Frizzy Hair",
      "Oily Scalp",
    ],

    "Shop by Ingredients": [
      "Capixyl",
      "Peptide",
      "Carnitine",
      "Maleic Acid",
    ],

    Hair: [
      "Treat",
      "Shampoo",
      "Conditioner",
      "Mask",
    ],
  };

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

  const cartCount =
    existingUser?.cart?.reduce(
      (acc, item) =>
        acc +
        Number(
          item?.quantity || 1
        ),
      0
    ) || 0;

  const menuItems = [
    "Shop",
    "Best Sellers",
    "Skin & Body Care",
    "Baby Care",
    "Hair Care",
    "AI Assistants",
    "Track Order",
  ];

  const navItemStyles = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -2,
      width: "100%",
      height: "2px",
      backgroundColor: "black",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition:
        "transform .3s",
    },

    "&:hover::after": {
      transform:
        "scaleX(1)",
    },

    ...Theme.font16SemiBold,
  };

  return (
    <Box>
      <NavSlider />

      <AppBar
        position="relative"
        sx={{
          backgroundColor:
            "#fff",
          color: "#000",
          boxShadow: "none",
          borderBottom:
            "1px solid #eee",
          px: { xs: 0, md: 4 },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898230/nav_logo_l4jgwz.webp"
            onClick={() =>
              navigate("/")
            }
            sx={{
              cursor: "pointer",
              height: {
                xs: 20,
                md: 25,
              },
            }}
          />

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 5,
            }}
          >
            {menuItems.map(
              (item) => (
                <Typography
                  key={item}
                  sx={
                    navItemStyles
                  }
                  onMouseEnter={() =>
                    setActiveMenu(
                      item
                    )
                  }
                >
                  {item}
                </Typography>
              )
            )}
          </Box>

          <Box display="flex">
            <IconButton>
              <StarBorderIcon />
            </IconButton>

            <IconButton>
              <SearchIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                user
                  ? setProfileOpen(
                      true
                    )
                  : setLoginOpen(
                      true
                    )
              }
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>

            <IconButton
              onClick={
                openCart
              }
            >
              <Badge
                badgeContent={
                  cartCount
                }
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>

        <Box
          onMouseLeave={() =>
            setActiveMenu(null)
          }
          sx={{
            position: "absolute",
            top: "100%",
            width: "100%",
            background:
              "#fff",
            zIndex: 999,
            overflow: "hidden",
            minHeight:
              activeMenu
                ? "450px"
                : 0,
            transition:
              ".3s",
          }}
        >
          <Box
            sx={{
              p: 5,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {(activeMenu ===
              "Hair Care" ||
              activeMenu ===
                "Skin & Body Care") && (
              <>
                {Object.entries(
                  activeMenu ===
                    "Hair Care"
                    ? hairCareColumns
                    : skinBodyCareColumns
                ).map(
                  (
                    [
                      title,
                      items,
                    ],
                    i
                  ) => (
                    <Box
                      key={i}
                    >
                      <Typography
                        sx={{
                          ...Theme.font16SemiBold,
                          mb: 2,
                        }}
                      >
                        {title}
                      </Typography>

                      {items.map(
                        (
                          item,
                          idx
                        ) => (
                          <Typography
                            key={
                              idx
                            }
                            sx={{
                              mb: 1,
                            }}
                          >
                            {item}
                          </Typography>
                        )
                      )}
                    </Box>
                  )
                )}
              </>
            )}

            {dropdownData[
              activeMenu
            ]?.map(
              (
                product
              ) => (
                <Box
                  key={
                    product.id
                  }
                  sx={{
                    width: 180,
                  }}
                >
                  <Box
                    component="img"
                    src={
                      product.img ||
                      product.img1
                    }
                    sx={{
                      width:
                        "100%",
                      height:
                        240,
                      objectFit:
                        "cover",
                    }}
                  />

                  <Typography
                    mt={1}
                    sx={
                      Theme.font16SemiBold
                    }
                  >
                    {
                      product.Name
                    }
                  </Typography>

                  <Typography>
                    ₹
                    {
                      product.Price
                    }
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </Box>
      </AppBar>

      <LoginModal
        open={loginOpen}
        onClose={() =>
          setLoginOpen(false)
        }
        setUser={setUser}
      />

      <UserProfileModal
        open={profileOpen}
        onClose={() =>
          setProfileOpen(false)
        }
        user={user}
      />
    </Box>
  );
};

export default MuiNavbar1;