// MuiNavbar1.jsx

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
  Button,
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

// Reusable full-width dropdown
const DropdownMenu = ({ title, products = [], columns = null, image, buttonText }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: "relative", cursor: "pointer" }}
    >
      <Typography sx={{ ...Theme.font16SemiBold, padding: "8px 12px", "&:hover": { color: "primary.main" } }}>
        {title}
      </Typography>

      {hover && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100vw",
            minHeight: "300px",
            maxHeight: "80vh",
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 6,
              maxWidth: "1200px",
              width: "100%",
              px: 4,
              py: 3,
              boxSizing: "border-box",
              fontFamily: Theme.font16SemiBold.fontFamily,
            }}
          >
            {products.length > 0 && (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {products.map((product) => (
                  <Box key={product.id} sx={{ width: "140px", textAlign: "center", cursor: "pointer" }}>
                    <img
                      src={product.img}
                      alt={product.Name}
                      style={{ width: "100%", height: "120px", objectFit: "cover" }}
                    />
                    <Typography variant="body2">{product.Name}</Typography>
                    {product.Price && <Typography variant="caption">₹ {product.Price}</Typography>}
                  </Box>
                ))}
              </Box>
            )}

            {columns &&
              Object.keys(columns).map((col, idx) => (
                <Box key={idx}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>{col}</Typography>
                  {columns[col].map((item, i) => (
                    <Typography key={i} variant="body2" sx={{ mb: 0.5, cursor: "pointer" }}>
                      {item}
                    </Typography>
                  ))}
                </Box>
              ))}

            {image && (
              <Box sx={{ textAlign: "center" }}>
                <img src={image} alt={title} style={{ width: "180px", height: "220px", objectFit: "cover" }} />
                {buttonText && (
                  <Button sx={{ mt: 1 }} variant="contained" size="small">
                    {buttonText}
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const MuiNavbar1 = ({ openCart }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  const getUsersState = useSelector((state) => state.getuserdata);
  const usersData = getUsersState?.data || [];
  const existingUser = usersData.find((item) => item.email === user?.email);
  const cartCount = existingUser?.cart?.reduce((acc, item) => acc + Number(item?.quantity || 1), 0) || 0;

  const menuItems = [
    "Shop",
    "Best Sellers",
    "Skin & Body Care",
    "Baby Care",
    "Hair Care",
    "AI Assistants",
    "Track Order",
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAccountClick = () => (user ? setProfileOpen(true) : setLoginOpen(true));

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
      transition: "transform 0.3s ease",
    },
    "&:hover::after": { transform: "scaleX(1)" },
    ...Theme.font16SemiBold,
  };

  // Redux products
  const productState = useSelector((state) => state.getproductdata);
  const products = productState.data || [];

  const shopProducts = products.filter((p) => p.categories === "shop");
  const bestSellersProducts = products.filter((p) => p.categories === "Best Sellers");
  const babyCareProducts = products.filter((p) => p.categories === "Baby Care");

  const skinBodyCareColumns = {
    "Shop by Concern": ["Acne", "Pigmentation", "Dryness", "UV Damage", "Underarm Darkness", "Oiliness", "Dullness", "Aging"],
    "Shop by Ingredients": ["Vitamin C", "BHA / Salicylic Acid", "Retinoid / Retinol", "Niacinamide", "UV Filters", "Ceramide"],
    "Skin Care": ["Cleanse", "Tone", "Treat", "Moisturize", "SPF", "Under Eye"],
    "Body Care": ["Cleanse", "Roll On", "Lotion"],
    "Lip": ["Treat", "Protect"],
  };
  const skinBodyCareImage = "https://res.cloudinary.com/dam89m7fe/image/upload/v1779269219/skin_body_care_example.avif";

  const hairCareColumns = {
    "Shop by Concern": ["Hair Fall", "Damaged Hair", "Dandruff", "Scalp Irritation", "Frizzy Hair", "Dull Hair", "Oily Scalp", "Hair Thinning"],
    "Shop by Ingredients": ["Capixyl", "Maleic Acid", "Peptide", "Carnitine"],
    Hair: ["Treat", "Shampoo", "Mask"],
  };
  const hairCareImage = "https://res.cloudinary.com/dam89m7fe/image/upload/v1779269219/hair_care_example.avif";
  const hairCareProductText = "New Launch: Hydrating Factors 7.3% Hair Shampoo";

  return (
    <Box>
      <NavSlider />
      <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000", boxShadow: "none", borderBottom: "1px solid #eee", px: { xs: 0, md: 4 } }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* MOBILE LEFT */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "black", p: 1 }}>
              <MenuIcon />
            </IconButton>
            <IconButton sx={{ color: "black", p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* LOGO */}
          <Box sx={{ position: { xs: "absolute", md: "static" }, left: { xs: "50%" }, transform: { xs: "translateX(-50%)", md: "none" } }}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898230/nav_logo_l4jgwz.webp"
              alt="logo"
              onClick={() => navigate("/")}
              sx={{ height: { xs: "20px", md: "25px" }, width: "auto", display: "block", cursor: "pointer" }}
            />
          </Box>

          {/* DESKTOP MENU */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
            <DropdownMenu title="Shop" products={shopProducts} />
            <DropdownMenu title="Best Sellers" products={bestSellersProducts} />
            <DropdownMenu title="Skin & Body Care" columns={skinBodyCareColumns} image={skinBodyCareImage} />
            <DropdownMenu title="Baby Care" products={babyCareProducts} />
            <DropdownMenu title="Hair Care" columns={hairCareColumns} image={hairCareImage} buttonText={hairCareProductText} />
            {menuItems.filter((item) => !["Shop", "Best Sellers", "Skin & Body Care", "Baby Care", "Hair Care"].includes(item)).map((item, index) => (
              <Typography key={index} sx={navItemStyles}>{item}</Typography>
            ))}
          </Box>

          {/* RIGHT ICONS */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ color: "black", p: 1 }}>
              <StarBorderIcon sx={{ fontSize: { md: "28px", xs: "25px" } }} />
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <IconButton sx={{ color: "black" }}>
                <SearchIcon sx={{ fontSize: { md: "28px", xs: "25px" } }} />
              </IconButton>
              <IconButton sx={{ color: "black" }} onClick={handleAccountClick}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: { md: "28px", xs: "25px" } }} />
              </IconButton>
            </Box>
            <IconButton sx={{ p: 1 }} onClick={openCart}>
              <Badge badgeContent={cartCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "black", color: "white" } }}>
                <ShoppingCartOutlinedIcon sx={{ color: "black", fontSize: { md: "28px", xs: "20px" } }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { width: "100%", maxWidth: "350px" } }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ ...Theme.font16SemiBold, textTransform: "uppercase" }}>Menu</Typography>
            <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1.5 }}>
                  <Typography sx={Theme.font16SemiBold}>{item}</Typography>
                </ListItem>
                <Divider variant="middle" component="li" sx={{ ml: 0 }} />
              </React.Fragment>
            ))}
            <ListItem sx={{ py: 1.5, cursor: "pointer" }} onClick={() => { handleAccountClick(); setMobileOpen(false); }}>
              <Typography sx={Theme.font16SemiBold}>Account</Typography>
            </ListItem>
          </List>
          <Box sx={{ display: "flex", gap: 2, p: 2, mt: 2 }}>
            <EmailIcon sx={{ color: "#666" }} />
            <FacebookIcon sx={{ color: "#666" }} />
            <InstagramIcon sx={{ color: "#666" }} />
            <YouTubeIcon sx={{ color: "#666" }} />
          </Box>
        </Box>
      </Drawer>

      {/* MODALS */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} setUser={setUser} openProfile={() => setProfileOpen(true)} />
      <UserProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} user={user} setUser={setUser} />
    </Box>
  );
};

export default MuiNavbar1;