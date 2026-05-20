// UserProfile.jsx

import React, {
  useState,
  useEffect,
} from "react";

import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  TextField,
  Card,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import {
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { getUserDataActionInitiate } from "../redux/actions/getUserAction";

import { postUserDataActionInitiate } from "../redux/actions/addUserAction";

import { putUserDataActionInitiate } from "../redux/actions/updateUserAction";
import { Theme } from "../GlobalStyles";

const UserProfileModal = ({
  open,
  onClose,
  user,
  setUser,
}) => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] =
    useState("profile");

  /* RESPONSIVE EDIT STATES */
  const [editProfile, setEditProfile] =
    useState(false);

  const [editAddress, setEditAddress] =
    useState(false);

  /* GET USERS */
  const getUsersState = useSelector(
    (state) =>
      state?.getuserdata || {
        data: [],
      }
  );

  const data =
    getUsersState?.data || [];

  /* FIND CURRENT USER */
  const existingUser = data.find(
    (item) => item.email === user?.email
  );

  /* PROFILE STATES */
  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  /* ADDRESS STATES */
  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [stateName, setStateName] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  /* LOAD USER */
  useEffect(() => {
    dispatch(getUserDataActionInitiate());
  }, [dispatch]);

  /* SET USER DATA */
  useEffect(() => {
    if (existingUser) {
      setFirstName(
        existingUser.firstName || ""
      );

      setLastName(
        existingUser.lastName || ""
      );

      setPhone(
        existingUser.phone || ""
      );

      setAddress(
        existingUser.address || ""
      );

      setCity(
        existingUser.city || ""
      );

      setStateName(
        existingUser.state || ""
      );

      setPincode(
        existingUser.pincode || ""
      );
    }
  }, [existingUser]);

  if (!open) return null;

  /* SAVE PROFILE + ADDRESS */
  const handleSaveProfile =
    async () => {
      try {
        const fullName = `${firstName} ${lastName}`;

        /* UPDATE FIREBASE PROFILE */
        await updateProfile(
          auth.currentUser,
          {
            displayName: fullName,
          }
        );

        /* FORM DATA */
        const formData = {
          firstName,
          lastName,
          fullName,
          email: user?.email,
          phone,
          address,
          city,
          state: stateName,
          pincode,
          orders:
            existingUser?.orders || [],
        };

        /* UPDATE / CREATE USER */
        if (existingUser?.id) {
          await dispatch(
            putUserDataActionInitiate(
              formData,
              existingUser.id
            )
          );
        } else {
          await dispatch(
            postUserDataActionInitiate(
              formData
            )
          );
        }

        /* UPDATE LOCAL USER */
        setUser({
          ...user,
          displayName: fullName,
        });

        setEditProfile(false);

        setEditAddress(false);

        alert(
          "Profile Updated Successfully"
        );

        dispatch(
          getUserDataActionInitiate()
        );
      } catch (error) {
        console.log(error);

        alert(error.message);
      }
    };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        p: { xs: 1, md: 2 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1280px",
          height: {
            xs: "100vh",
            md: "90vh",
          },
          bgcolor: "#fff",
          borderRadius: {
            xs: 0,
            md: "20px",
          },
          overflow: "hidden",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          position: "relative",
        }}
      >
        {/* CLOSE */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            bgcolor: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* SIDEBAR */}
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "280px",
            },
            bgcolor: "#f7f7f7",
            borderRight: {
              md: "1px solid #eee",
            },
            borderBottom: {
              xs: "1px solid #eee",
              md: "none",
            },
            p: 2,
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "column",
            },
            justifyContent:
              "space-between",
              pt:{md:12}
          }}
        >
          {/* TOP */}
          <Box>
            {/* USER CARD */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
                bgcolor: "#fff",
                p: 2,
                borderRadius: "16px",
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  bgcolor: "#111",
                }}
              >
                {user?.email?.charAt(0)}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {existingUser?.fullName ||
                    user?.displayName ||
                    "Minimalist User"}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#666",
                    wordBreak:
                      "break-word",
                  }}
                >
                  {user?.email}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#666",
                    wordBreak:
                      "break-word",
                  }}
                >
                  {existingUser?.phone ||
                    user?.phone ||
                    "Minimalist User"}
                </Typography>
              </Box>
            </Box>

            {/* MENU */}
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  md: "column",
                },
                gap: 1.5,
                overflowX: "auto",
              }}
            >
              <Button
                onClick={() =>
                  setActiveTab("profile")
                }
                sx={{
                  minWidth: {
                    xs: "120px",
                    md: "100%",
                  },
                  justifyContent:
                    "flex-start",
                  gap: 1,
                  color: "#000",
                  bgcolor:
                    activeTab ===
                      "profile"
                      ? "#e9e9e9"
                      : "transparent",
                  borderRadius:
                    "14px",
                  p: 2,
                  textTransform:
                    "none",
                }}
              >
                <PersonOutlineOutlinedIcon />
                Profile
              </Button>

              <Button
                onClick={() =>
                  setActiveTab("orders")
                }
                sx={{
                  minWidth: {
                    xs: "120px",
                    md: "100%",
                  },
                  justifyContent:
                    "flex-start",
                  gap: 1,
                  color: "#000",
                  bgcolor:
                    activeTab ===
                      "orders"
                      ? "#e9e9e9"
                      : "transparent",
                  borderRadius:
                    "14px",
                  p: 2,
                  textTransform:
                    "none",
                }}
              >
                <Inventory2OutlinedIcon />
                Orders
              </Button>

              <Button
                onClick={() =>
                  setActiveTab("address")
                }
                sx={{
                  minWidth: {
                    xs: "120px",
                    md: "100%",
                  },
                  justifyContent:
                    "flex-start",
                  gap: 1,
                  color: "#000",
                  bgcolor:
                    activeTab ===
                      "address"
                      ? "#e9e9e9"
                      : "transparent",
                  borderRadius:
                    "14px",
                  p: 2,
                  textTransform:
                    "none",
                }}
              >
                <LocationOnOutlinedIcon />
                Address
              </Button>
            </Box>
          </Box>

          {/* LOGOUT */}
          <Button
            onClick={async () => {
              try {
                await signOut(auth);

                setUser(null);

                onClose();
              } catch (error) {
                console.log(error);
              }
            }}
            sx={{
              justifyContent:
                "flex-start",
              gap: 1,
              color: "red",
              mt: 2,
              textTransform: "none",
            }}
          >
            <LogoutOutlinedIcon />
            Log Out
          </Button>
        </Box>

        {/* CONTENT */}
        <Box
          sx={{
            flex: 1,
            p: {
              xs: 2,
              md: 4,
            },
            overflowY: "auto",
          }}
        >
          {/* PROFILE */}
          {activeTab ===
            "profile" && (
              <Box>
                {/* HEADER */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 4,
                    mx: 2,
                    mt: 4,
                    border: '1px solid silver',
                    py: 2,
                    px: 2,
                    background: '#e9e9e9'
                  }}
                >
                  <PersonOutlineOutlinedIcon sx={{ fontSize: '40px' }} />
                  <Box>
                    <Typography
                      sx={{
                        ...Theme.font16Regular,
                        fontWeight: 700,
                        ml: 1
                      }}
                    >
                      Profile Details

                    </Typography>
                    <Typography
                      sx={{
                        ...Theme.font12Regular,
                        ml: 1
                      }}
                    >
                      Manage your personal information
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={() =>
                      setEditProfile(
                        !editProfile
                      )
                    }
                    sx={{ ml: { md: 58 } }}
                  >
                    <EditOutlinedIcon sx={{fontSize:'18px'}} /> <Typography sx={{...Theme.font15Regular,fontWeight:'600',ml:.7,color:'black'}}>Edit</Typography>
                  </IconButton>
                </Box>
                 <Typography sx={{...Theme.font12Regular,ml:4}}>BASIC INFORMATION</Typography>
                 
                {/* PROFILE CARD */}
                <Card
                  sx={{
                    p: {
                      xs: 2,
                      md: 4,
                    },
                    borderRadius: "20px",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                >
                 
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                      {
                        xs: "1fr",
                        md: "1fr 1fr",
                      },
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="First Name"
                      value={firstName}
                      disabled={
                        !editProfile
                      }
                      onChange={(e) =>
                        setFirstName(
                          e.target.value
                        )
                      }
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "#e9e9e9",
                        },


                        "& .MuiInputBase-input": {
                          ...Theme.font14Regular,
                          color: 'black'
                        },


                        "& .MuiInputLabel-root": {
                          color: 'black'
                        },
                      }}
                    />

                    <TextField
                      label="Last Name"
                      value={lastName}
                      disabled={
                        !editProfile
                      }
                      onChange={(e) =>
                        setLastName(
                          e.target.value
                        )
                      }
                      fullWidth
                     sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "#e9e9e9",
                        },


                        "& .MuiInputBase-input": {
                          ...Theme.font14Regular,
                          color: 'black'
                        },


                        "& .MuiInputLabel-root": {
                          color: 'black'
                        },
                      }}
                    />

                    <TextField
                      label="Email"
                      value={
                        user?.email || ""
                      }
                      disabled
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "#e9e9e9",
                        },


                        "& .MuiInputBase-input": {
                          ...Theme.font14Regular,
                          color: 'black'
                        },


                        "& .MuiInputLabel-root": {
                          color: 'black'
                        },
                      }}
                    />

                    <TextField
                      label="Phone"
                      value={phone}
                      disabled={
                        !editProfile
                      }
                      onChange={(e) =>
                        setPhone(
                          e.target.value
                        )
                      }
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "#e9e9e9",
                        },


                        "& .MuiInputBase-input": {
                          ...Theme.font14Regular,
                          color: 'black'
                        },


                        "& .MuiInputLabel-root": {
                          color: 'black'
                        },
                      }}
                    />
                  </Box>

                  {editProfile && (
                    <Button
                      variant="contained"
                      onClick={
                        handleSaveProfile
                      }
                      sx={{
                        mt: 4,
                        bgcolor: "#111",
                        borderRadius:
                          "10px",
                        textTransform:
                          "none",
                        px: 5,
                        height: "50px",

                        "&:hover": {
                          bgcolor:
                            "#000",
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  )}
                </Card>
              </Box>
            )}

          {/* ORDERS */}
          {activeTab ===
            "orders" && (
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "24px",
                      md: "30px",
                    },
                    fontWeight: 700,
                    mb: 4,
                  }}
                >
                  My Orders
                </Typography>

                {existingUser?.orders
                  ?.length > 0 ? (
                  existingUser.orders.map(
                    (
                      order,
                      index
                    ) => (
                      <Card
                        key={index}
                        sx={{
                          p: 3,
                          mb: 2,
                          borderRadius:
                            "16px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {
                            order.productName
                          }
                        </Typography>

                        <Divider
                          sx={{
                            my: 2,
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#666",
                          }}
                        >
                          ₹
                          {
                            order.price
                          }
                        </Typography>
                      </Card>
                    )
                  )
                ) : (
                  <Box
                    sx={{
                      height: "200px",
                      border:
                        "1px solid #e5e5e5",
                      borderRadius:
                        "20px",
                      display: "flex",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                      color: "#666",
                      textAlign:
                        "center",
                      p: 2,
                    }}
                  >
                    No orders found.
                  </Box>
                )}
              </Box>
            )}

          {/* ADDRESS */}
          {activeTab ===
            "address" && (
              <Box>
                {/* HEADER */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "24px",
                        md: "30px",
                      },
                      fontWeight: 700,
                    }}
                  >
                    Saved Address
                  </Typography>

                  <IconButton
                    onClick={() =>
                      setEditAddress(
                        !editAddress
                      )
                    }
                    sx={{ mr: 8 }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Box>

                <Card
                  sx={{
                    p: {
                      xs: 2,
                      md: 4,
                    },
                    borderRadius: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                      {
                        xs: "1fr",
                        md: "1fr 1fr",
                      },
                      gap: 3,
                    }}
                  >
                    <TextField
                      label="Address"
                      value={address}
                      disabled={
                        !editAddress
                      }
                      onChange={(e) =>
                        setAddress(
                          e.target.value
                        )
                      }
                      fullWidth
                    />

                    <TextField
                      label="City"
                      value={city}
                      disabled={
                        !editAddress
                      }
                      onChange={(e) =>
                        setCity(
                          e.target.value
                        )
                      }
                      fullWidth
                    />

                    <TextField
                      label="State"
                      value={stateName}
                      disabled={
                        !editAddress
                      }
                      onChange={(e) =>
                        setStateName(
                          e.target.value
                        )
                      }
                      fullWidth
                    />

                    <TextField
                      label="Pincode"
                      value={pincode}
                      disabled={
                        !editAddress
                      }
                      onChange={(e) =>
                        setPincode(
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Box>

                  {editAddress && (
                    <Button
                      variant="contained"
                      onClick={
                        handleSaveProfile
                      }
                      sx={{
                        mt: 4,
                        bgcolor: "#111",
                        borderRadius:
                          "10px",
                        textTransform:
                          "none",
                        px: 5,
                        height: "50px",

                        "&:hover": {
                          bgcolor:
                            "#000",
                        },
                      }}
                    >
                      Save Address
                    </Button>
                  )}
                </Card>
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileModal;