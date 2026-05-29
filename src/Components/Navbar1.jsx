import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Container,
  Drawer,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { Theme } from "../GlobalStyles";
import NavSlider from "./NavSlider";
import LoginModal from "./LoginModal";

import { useNavigate } from "react-router-dom";
import UserProfileModal from "./UserProfile";

const MuiNavbar1 = ({ openCart }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const productState = useSelector((state) => state.getproductdata);
  const products = productState?.data || [];

  const shopProducts = products.filter(
    (p) => p?.categories?.toLowerCase() === "shop"
  );

  const bestSellersProducts = products.filter(
    (p) => p?.categories === "Best Sellers"
  );

  const babyCareProducts = products.filter(
    (p) => p?.categories === "Baby Care"
  );

  const hairProducts = products.filter(
    (p) => p?.categories === "Hair Care"
  );
  
 const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

const getproductsdata = useSelector((state) => state.getproductdata);
const d = getproductsdata?.data || [];


const filteredProducts = searchQuery
  ? d.filter((p) => 
      p?.categories === "Our Best Sellers" && 
      p?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  const dropdownData = {
    Shop: shopProducts.slice(0, 8),
    "Best Sellers": bestSellersProducts.slice(0, 8),
    "Baby Care": babyCareProducts.slice(0, 8),
    "Hair Care": hairProducts.slice(0, 8),
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
    "Skin Care": ["Cleanse", "Tone", "Treat", "Moisturize", "SPF"],
    "Body Care": ["Body Wash", "Lotion", "Roll On"],
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
    Hair: ["Treat", "Shampoo", "Conditioner", "Mask"],
  };

  const getUsersState = useSelector((state) => state.getuserdata);
  const usersData = getUsersState?.data || [];

  const existingUser = usersData.find((item) => item.email === user?.email);

  const cartCount =
    existingUser?.cart?.reduce(
      (acc, item) => acc + Number(item?.quantity || 1),
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

  const dropdownMenus = [
    "Shop",
    "Best Sellers",
    "Skin & Body Care",
    "Baby Care",
    "Hair Care",
  ];

  const navItemStyles = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    "::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -2,
      width: "100%",
      height: "2px",
      backgroundColor: "black",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform .3s",
    },
    ":hover::after": {
      transform: "scaleX(1)",
    },
    ...Theme.font16SemiBold,
  };

  const skinCareImage =
    "https://res.cloudinary.com/dam89m7fe/image/upload/v1779339131/skin_menu_byfjnv.avif";

  const hairCareImage =
    "https://res.cloudinary.com/dam89m7fe/image/upload/v1779339180/haircare_bhko1f.avif";

  return (
    <Box>
      <NavSlider />

      <AppBar
        position="relative"
        sx={{
          background: "#fff",
          color: "#000",
          boxShadow: "none",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 4 },
            justifyContent: "space-between",
          }}
        >
          {/* Left */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Mobile toggler */}
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
              }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              component="img"
              src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898230/nav_logo_l4jgwz.webp"
              sx={{
                height: { xs: 20, md: 25 },
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 5,
            }}
          >
            {menuItems.map((item) => (
              <Typography
                key={item}
                sx={navItemStyles}
                onMouseEnter={() => {
                  if (dropdownMenus.includes(item)) {
                    setActiveMenu(item);
                  } else {
                    setActiveMenu(null);
                  }
                }}
                onClick={() => {
                  if (item === "Track Order") {
                    navigate("/track-order");
                  }
                  if (item === "AI Assistants") {
                    navigate("/ai-assistants");
                  }
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* Right Icons */}
          <Box display="flex">
            <IconButton
              sx={{
                display: { xs: "none", sm: "none", md: "inline-flex" },
              }}
            >
              <StarBorderIcon sx={{ color: "black", fontSize: "28px" }} />
            </IconButton>

            <IconButton
              sx={{
                display: { xs: "none", sm: "none", md: "inline-flex" },
              }}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <SearchIcon sx={{ color: "black", fontSize: "28px" }} />
            </IconButton>

            <IconButton
              onClick={() => (user ? setProfileOpen(true) : setLoginOpen(true))}
            >
              <PersonOutlineOutlinedIcon
                sx={{ color: "black", fontSize: "28px" }}
              />
            </IconButton>

            <IconButton onClick={openCart}>
              <Badge
                badgeContent={cartCount}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "50%",
                    minWidth: "18px",
                    height: "18px",
                    fontSize: "11px",
                  },
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{ color: "black", fontSize: "25px" }}
                />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
            {searchOpen && (
                   <Box sx={{ p: 3, bgcolor: "#fff", borderBottom: "1px solid #eee", position: "absolute", width: "100%", zIndex: 1000 }}>
                     <Container maxWidth="md">
                       <TextField 
                         fullWidth 
                         placeholder="Search products..." 
                         value={searchQuery} 
                         onChange={(e) => setSearchQuery(e.target.value)} 
                         autoFocus
                         InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} 
                       />
                       {searchQuery && (
                         <Box sx={{ mt: 2, maxHeight: "300px", overflowY: "auto" }}>
                           {filteredProducts.map((p) => (
                             <Box key={p.id} sx={{ display: "flex", p: 2, cursor: "pointer", borderBottom: "1px solid #f5f5f5", "&:hover": { bgcolor: "#f9f9f9" } }} onClick={() => { navigate(`/product/${p.id}`); setSearchOpen(false); }}>
                               <img src={p.img || p.img1} alt={p.Name} style={{ width: 60, height: 60, objectFit: "cover" }} />
                               <Typography sx={{ ml: 3, alignSelf: "center", ...Theme.font16SemiBold }}>{p.Name}</Typography>
                             </Box>
                           ))}
                           {filteredProducts.length === 0 && <Typography sx={{ p: 2, color: 'gray' }}>No products found.</Typography>}
                         </Box>
                       )}
                     </Container>
                   </Box>
                 )}
         
       
        <Box
          onMouseLeave={() => setActiveMenu(null)}
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: "100%",
            width: "100%",
            background: "#fff",
            zIndex: 999,
            overflow: "hidden",
            height: dropdownMenus.includes(activeMenu) ? "450px" : 0,
            transition: "all .4s ease",
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                py: 5,
                gap: 5,
              }}
            >
              {/* LEFT SECTION */}
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {(activeMenu === "Hair Care" ||
                  activeMenu === "Skin & Body Care") &&
                  Object.entries(
                    activeMenu === "Hair Care"
                      ? hairCareColumns
                      : skinBodyCareColumns
                  ).map(([title, items]) => (
                    <Box key={title}>
                      <Typography
                        sx={{
                          ...Theme.font16SemiBold,
                          mb: 1,
                          ml: 12,
                        }}
                      >
                        {title}
                      </Typography>

                      {items.map((item, i) => (
                        <Typography
                          key={i}
                          sx={{
                            mb: 1,
                            ...Theme.font15Regular,
                            ml: 12,
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  ))}

                {dropdownData[activeMenu]?.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      width: 180,
                    }}
                  >
                    <Box
                      component="img"
                      src={product.img || product.img1}
                      sx={{
                        width: "100%",
                        height: 240,
                        objectFit: "cover",
                      }}
                    />

                    <Typography
                      sx={{
                        mt: 2,
                        ...Theme.font12Regular,
                      }}
                    >
                      {product.Price}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        ...Theme.font16SemiBold,
                      }}
                    >
                      {product.Name}
                    </Typography>
                  </Box>
                ))}
              </Box>

             
              {(activeMenu === "Skin & Body Care" ||
                activeMenu === "Hair Care") && (
                <Box
                  sx={{
                    width: 280,
                  }}
                >
                  <Box
                    component="img"
                    src={
                      activeMenu === "Skin & Body Care"
                        ? skinCareImage
                        : hairCareImage
                    }
                    sx={{
                      width: "100%",
                      height: 320,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              )}
            </Box>
          </Container>
        </Box>

       
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{
              width: 280,
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 4,
              }}
            >
              <Typography sx={Theme.font16SemiBold}>Menu</Typography>

              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            {menuItems.map((item) => (
              <Typography
                key={item}
                sx={{
                  py: 2,
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  ...Theme.font16SemiBold,
                }}
                onClick={() => {
                  setDrawerOpen(false);

                  if (item === "Track Order") {
                    navigate("/track-order");
                  }
                  if (item === "AI Assistants") {
                    navigate("/ai-assistants");
                  }
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Drawer>
      </AppBar>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setUser={setUser}
      />

      <UserProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        setUser={setUser}
      />
    </Box>
  );
};

export default MuiNavbar1;