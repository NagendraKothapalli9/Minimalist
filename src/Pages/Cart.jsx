import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Checkbox,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";


import { getUserDataActionInitiate } from "../redux/actions/getUserAction";
import { putUserDataActionInitiate } from "../redux/actions/updateUserAction";

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);


  const getUsersState = useSelector((state) => state.getuserdata);
  const usersData = getUsersState?.data || [];


  const existingUser = usersData.find((item) => item.email === user?.email);
  const cartItems = existingUser?.cart || [];

  useEffect(() => {
    dispatch(getUserDataActionInitiate());
  }, [dispatch]);

 
  const totalMRP = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + Number(item?.mrp || 0) * Number(item?.quantity || 1), 0)
    : 0;

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + Number(item?.price || 0) * Number(item?.quantity || 1), 0)
    : 0;

  const savings = totalMRP - totalPrice;

 
  const updateCartInDB = async (updatedCart) => {
    try {
      const updatedUser = { ...existingUser, cart: updatedCart };
      await dispatch(putUserDataActionInitiate(updatedUser, existingUser.id));
      dispatch(getUserDataActionInitiate());
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleIncreaseQty = (firebaseKey) => {
    const updatedCart = existingUser.cart.map((item) =>
      item.firebaseKey === firebaseKey ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartInDB(updatedCart);
  };

  const handleDecreaseQty = (firebaseKey) => {
    const updatedCart = existingUser.cart.map((item) =>
      item.firebaseKey === firebaseKey
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    updateCartInDB(updatedCart);
  };

  const handleDeleteItem = (firebaseKey) => {
    const updatedCart = existingUser.cart.filter((item) => item.firebaseKey !== firebaseKey);
    updateCartInDB(updatedCart);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: "420px", }, 
          maxWidth: "100%",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
     
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f5f5f5" }}>
        <Typography sx={{ fontSize: { xs: "16px", sm: "18px" }, fontWeight: 700, color: "#000" }}>
          Your Cart ({cartItems?.length || 0} items)
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#000" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      
      <Box sx={{ bgcolor: "#000000", color: "#fff", py: 1.2, px: 2, textAlign: "center" }}>
        <Typography sx={{ fontSize: { xs: "10px", sm: "11px" }, fontWeight: 600, letterSpacing: "0.3px" }}>
          Free Light Fluid SPF 50 Sunscreen on all orders! (Auto-Applied on checkout)
        </Typography>
      </Box>

      {/* MAIN CONTENT AREA */}
      {!Array.isArray(cartItems) || cartItems.length === 0 ? (
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", p: 4 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 700, mb: 0.5 }}>Your cart is empty</Typography>
          <Typography sx={{ color: "#777", fontSize: "13px" }}>Add products to continue shopping</Typography>
        </Box>
      ) : (
        <>
          {/* CART ITEMS LIST */}
          <Box sx={{ flex: 1, overflowY: "auto", px: { xs: 1.5, sm: 2 }, py: 1.5, bgcolor: "#fafafa" }}>
            <Stack spacing={1.5}>
              {cartItems.map((item, index) => {
                const discountPercentage = item.mrp && item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;
                
                return (
                  <Box
                    key={item?.firebaseKey || index}
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                      p: { xs: 1.2, sm: 1.5 },
                      display: "flex",
                      gap: { xs: 1.5, sm: 2 },
                      position: "relative",
                    }}
                  >
                    {/* PRODUCT IMAGE CONTAINER */}
                    <Box sx={{ width: { xs: "65px", sm: "75px" }, height: { xs: "85px", sm: "95px" }, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img
                        src={item?.image}
                        alt={item?.productName}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Box>

                    {/* PRODUCT DETAILS & ACTIONS */}
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                      <Box sx={{ pr: 2.5 }}>
                        <Typography 
                          sx={{ 
                            fontSize: { xs: "12px", sm: "13px" }, 
                            fontWeight: 600, 
                            color: "#111", 
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}
                        >
                          {item?.productName || "Product Title"}
                        </Typography>

                        {/* SIZE CHIP */}
                        <Box sx={{ mt: 0.5 }}>
                          <Typography 
                            component="span"
                            sx={{ 
                              px: 1, 
                              py: 0.2, 
                              border: "1px solid #e0e0e0", 
                              borderRadius: "4px", 
                              fontSize: "10px", 
                              color: "#666",
                              bgcolor: "#fcfcfc"
                            }}
                          >
                            {item?.size || "100ml"}
                          </Typography>
                        </Box>
                      </Box>

                      {/* ACTIONS ROW (QUANTITY & PRICE) */}
                      <Box 
                        sx={{ 
                          display: "flex", 
                          flexDirection: { xs: "column", sm: "row" }, 
                          alignItems: { xs: "flex-start", sm: "center" }, 
                          justifyContent: "space-between", 
                          gap: 1, 
                          mt: 1 
                        }}
                      >
                        {/* QUANTITY CONTROLLER */}
                        <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: "4px", bgcolor: "#fff" }}>
                          <IconButton size="small" onClick={() => handleDecreaseQty(item?.firebaseKey)} sx={{ p: "2px" }}>
                            <RemoveIcon sx={{ fontSize: "14px" }} />
                          </IconButton>
                          <Typography sx={{ px: 1, fontSize: "12px", fontWeight: 600 }}>
                            {item?.quantity || 1}
                          </Typography>
                          <IconButton size="small" onClick={() => handleIncreaseQty(item?.firebaseKey)} sx={{ p: "2px" }}>
                            <AddIcon sx={{ fontSize: "14px" }} />
                          </IconButton>
                        </Box>

                        {/* PRICE LABELS */}
                        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, flexWrap: "wrap" }}>
                          <Typography sx={{ textDecoration: "line-through", color: "#aaa", fontSize: "11px" }}>
                            ₹{item?.mrp || item?.price}
                          </Typography>
                          <Typography sx={{ fontWeight: 700, fontSize: { xs: "13px", sm: "14px" }, color: "#000" }}>
                            ₹{item?.price}
                          </Typography>
                          {discountPercentage > 0 && (
                            <Typography sx={{ color: "#2e7d32", fontSize: "10px", fontWeight: 600 }}>
                              ({discountPercentage}% OFF)
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>

                  
                    <IconButton
                      onClick={() => handleDeleteItem(item?.firebaseKey)}
                      size="small"
                      sx={{ position: "absolute", right: 6, top: 6, color: "#999", "&:hover": { color: "#d32f2f" } }}
                    >
                      <DeleteIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>
          </Box>

          <Box sx={{ bgcolor: "#fff", p: { xs: 1.5, sm: 2 }, borderTop: "1px solid #eee" }}>
      
            <TextField
              fullWidth
              size="small"
              placeholder="Enter Coupon Code"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumberOutlinedIcon sx={{ color: "#14b8a6", fontSize: "16px" }} />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: "12px",
                  borderRadius: "4px",
                  "& fieldset": { borderColor: "#e0e0e0" },
                 
                }
              }}
              sx={{ mb: 1.2 , display:{xs:'none',md:'block'}}}
            />

            {/* SAVED BADGE */}
            {savings > 0 && (
              <Box sx={{ bgcolor: "#00bfa5", color: "#fff", py: 0.5, px: 2, borderRadius: "4px", textAlign: "center", mb: 1.5 }}>
                <Typography sx={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2px" }}>
                  ₹{savings}.00 Saved so far!
                </Typography>
              </Box>
            )}

            {/* BILL DETAILS */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#000" }}>
                Estimated Total
              </Typography>
              <Box sx={{ textAlign: "right" }}>
                {savings > 0 && (
                  <Typography sx={{ textDecoration: "line-through", color: "#aaa", fontSize: "12px", mr: 1 }}>
                    ₹{totalMRP}.00
                  </Typography>
                )}
                <Typography sx={{ fontSize: { xs: "16px", sm: "18px" }, fontWeight: 800, color: "#000" }}>
                  ₹{totalPrice}.00
                </Typography>
              </Box>
            </Box>

            {/* PRIVACY CHECK */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, ml: -1 }}>
              <Checkbox size="small" defaultChecked sx={{ color: "#000", "&.Mui-checked": { color: "#000" } }} />
              <Typography sx={{ fontSize: "11px", color: "#444" }}>
                I agree to the <span style={{ textDecoration: "underline", cursor: "pointer" }}>T&C</span> & <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Notice</span>
              </Typography>
            </Box>

            {/* SUBMIT BUTTON */}
            <Button
              fullWidth
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#000000",
                color: "#fff",
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                "&:hover": { bgcolor: "#1a1a1a" },
              }}
            >
              <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>Checkout</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: 400, color: "#bbb" }}>Powered by GoKwik</Typography>
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;