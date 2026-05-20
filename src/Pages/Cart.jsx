// CartDrawer.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Checkbox,
  TextField,
} from "@mui/material";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  getUserDataActionInitiate,
} from "../redux/actions/getUserAction";

import {
  putUserDataActionInitiate,
} from "../redux/actions/updateUserAction";

const CartDrawer = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch();

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

  /* GET USERS */
  const getUsersState =
    useSelector(
      (state) =>
        state.getuserdata
    );

  const usersData =
    getUsersState?.data || [];

  /* CURRENT USER */
  const existingUser =
    usersData.find(
      (item) =>
        item.email === user?.email
    );

  /* CART ITEMS */
  const cartItems =
    existingUser?.cart || [];

  useEffect(() => {
    dispatch(
      getUserDataActionInitiate()
    );
  }, [dispatch]);

  /* TOTAL PRICE */
  const totalPrice =
    Array.isArray(cartItems)
      ? cartItems.reduce(
          (acc, item) =>
            acc +
            Number(item?.price || 0) *
              Number(
                item?.quantity || 1
              ),
          0
        )
      : 0;

  /* =========================
      INCREASE QTY
  ========================== */
  const handleIncreaseQty =
    async (firebaseKey) => {
      try {
        const updatedCart =
          existingUser.cart.map(
            (item) =>
              item.firebaseKey ===
              firebaseKey
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }
                : item
          );

        const updatedUser = {
          ...existingUser,
          cart: updatedCart,
        };

        await dispatch(
          putUserDataActionInitiate(
            updatedUser,
            existingUser.id
          )
        );

        dispatch(
          getUserDataActionInitiate()
        );
      } catch (error) {
        console.log(error);
      }
    };

  /* =========================
      DECREASE QTY
  ========================== */
  const handleDecreaseQty =
    async (firebaseKey) => {
      try {
        const updatedCart =
          existingUser.cart.map(
            (item) =>
              item.firebaseKey ===
              firebaseKey
                ? {
                    ...item,
                    quantity:
                      item.quantity > 1
                        ? item.quantity -
                          1
                        : 1,
                  }
                : item
          );

        const updatedUser = {
          ...existingUser,
          cart: updatedCart,
        };

        await dispatch(
          putUserDataActionInitiate(
            updatedUser,
            existingUser.id
          )
        );

        dispatch(
          getUserDataActionInitiate()
        );
      } catch (error) {
        console.log(error);
      }
    };

  /* =========================
      DELETE ITEM
  ========================== */
  const handleDeleteItem =
    async (firebaseKey) => {
      try {
        const updatedCart =
          existingUser.cart.filter(
            (item) =>
              item.firebaseKey !==
              firebaseKey
          );

        const updatedUser = {
          ...existingUser,
          cart: updatedCart,
        };

        await dispatch(
          putUserDataActionInitiate(
            updatedUser,
            existingUser.id
          )
        );

        dispatch(
          getUserDataActionInitiate()
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: "430px",
          },
          bgcolor: "#f5f5f5",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Your Cart (
          {cartItems?.length || 0}{" "}
          items)
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* OFFER BAR */}
      <Box
        sx={{
          bgcolor: "#000",
          color: "#fff",
          py: 2,
          textAlign: "center",
          borderBottomLeftRadius:
            "18px",
          borderBottomRightRadius:
            "18px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Earn 5% MCash with each
          order (1 MCash = ₹1)
        </Typography>
      </Box>

      {/* EMPTY CART */}
      {!Array.isArray(cartItems) ||
      cartItems.length === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: "26px",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Your cart is empty
          </Typography>

          <Typography
            sx={{
              color: "#777",
            }}
          >
            Add products to continue
            shopping
          </Typography>
        </Box>
      ) : (
        <>
          {/* CART ITEMS */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
            }}
          >
            <Stack spacing={2}>
              {cartItems.map(
                (
                  item,
                  index
                ) => (
                  <Box
                    key={
                      item?.firebaseKey ||
                      index
                    }
                    sx={{
                      bgcolor:
                        "#fff",
                      borderRadius:
                        "16px",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display:
                          "flex",
                        gap: 2,
                      }}
                    >
                      {/* IMAGE */}
                      <Box
                        sx={{
                          width:
                            "90px",
                          height:
                            "110px",
                          bgcolor:
                            "#f3f3f3",
                          borderRadius:
                            "8px",
                          overflow:
                            "hidden",
                        }}
                      >
                        <img
                          src={
                            item?.image
                          }
                          alt={
                            item?.productName
                          }
                          style={{
                            width:
                              "100%",
                            height:
                              "100%",
                            objectFit:
                              "contain",
                          }}
                        />
                      </Box>

                      {/* DETAILS */}
                      <Box
                        sx={{
                          flex: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize:
                              "18px",
                            fontWeight: 600,
                            lineHeight:
                              1.3,
                          }}
                        >
                          {
                            item?.productName
                          }
                        </Typography>

                        {/* SIZE */}
                        <Box
                          sx={{
                            mt: 1,
                          }}
                        >
                          <select
                            style={{
                              padding:
                                "6px 12px",
                              borderRadius:
                                "8px",
                              border:
                                "1px solid #ccc",
                              outline:
                                "none",
                            }}
                          >
                            <option>
                              {
                                item?.size
                              }
                            </option>
                          </select>
                        </Box>

                        {/* PRICE + QTY */}
                        <Box
                          sx={{
                            mt: 2,
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                          }}
                        >
                          {/* PRICE */}
                          <Box>
                            <Typography
                              sx={{
                                textDecoration:
                                  "line-through",
                                color:
                                  "#999",
                                fontSize:
                                  "14px",
                              }}
                            >
                              ₹
                              {
                                item?.mrp
                              }
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize:
                                  "24px",
                              }}
                            >
                              ₹
                              {
                                item?.price
                              }
                            </Typography>

                            <Typography
                              sx={{
                                color:
                                  "green",
                                fontSize:
                                  "14px",
                                fontWeight: 600,
                              }}
                            >
                              (
                              {
                                item?.offer
                              }
                              % OFF)
                            </Typography>
                          </Box>

                          {/* QUANTITY */}
                          <Box
                            sx={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                border:
                                  "1px solid #ddd",
                                borderRadius:
                                  "10px",
                                overflow:
                                  "hidden",
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleDecreaseQty(
                                    item?.firebaseKey
                                  )
                                }
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>

                              <Typography
                                sx={{
                                  px: 1,
                                  fontWeight: 600,
                                }}
                              >
                                {
                                  item?.quantity
                                }
                              </Typography>

                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleIncreaseQty(
                                    item?.firebaseKey
                                  )
                                }
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>

                            {/* DELETE */}
                            <IconButton
                              onClick={() =>
                                handleDeleteItem(
                                  item?.firebaseKey
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )
              )}
            </Stack>
          </Box>

          {/* FOOTER */}
          <Box
            sx={{
              bgcolor: "#fff",
              p: 2,
              borderTop:
                "1px solid #e0e0e0",
            }}
          >
            {/* COUPON */}
            <TextField
              fullWidth
              placeholder="Enter Coupon Code"
              sx={{
                mb: 2,
                bgcolor: "#f8f8f8",
              }}
            />

            {/* TOTAL */}
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                Estimated Total
              </Typography>

              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: 700,
                }}
              >
                ₹{totalPrice}
              </Typography>
            </Box>

            {/* TERMS */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Checkbox />

              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                I agree to the T&C &
                Privacy Notice
              </Typography>
            </Box>

            {/* CHECKOUT */}
            <Button
              fullWidth
              sx={{
                bgcolor: "#000",
                color: "#fff",
                py: 1.8,
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: 700,

                "&:hover": {
                  bgcolor: "#111",
                },
              }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;