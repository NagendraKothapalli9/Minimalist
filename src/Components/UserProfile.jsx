// UserProfile.jsx

import React, { useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { signOut, updateProfile } from "firebase/auth";

import { auth } from "../firebase";

const UserProfileModal = ({
  open,
  onClose,
  user,
  setUser,
}) => {
  const [activeTab, setActiveTab] =
    useState("profile");

  /* PROFILE STATES */
  const [firstName, setFirstName] =
    useState(
      user?.displayName?.split(" ")[0] ||
        ""
    );

  const [lastName, setLastName] =
    useState(
      user?.displayName?.split(" ")[1] ||
        ""
    );

  const [phone, setPhone] =
    useState(user?.phoneNumber || "");

  if (!open) return null;

  /* SAVE PROFILE */
  const handleSaveProfile =
    async () => {
      try {
        const fullName = `${firstName} ${lastName}`;

        await updateProfile(
          auth.currentUser,
          {
            displayName: fullName,
          }
        );

        /* UPDATE LOCAL USER */
        setUser({
          ...user,
          displayName: fullName,
          phoneNumber: phone,
        });

        alert(
          "Profile Updated Successfully"
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
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "95%",
          maxWidth: "1280px",
          height: "90vh",
          bgcolor: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          position: "relative",
        }}
      >
        {/* CLOSE */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 10,
          }}
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* SIDEBAR */}
        <Box
          sx={{
            width: "280px",
            bgcolor: "#f7f7f7",
            borderRight: "1px solid #eee",
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* USER */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 5,
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
                  fontSize: "20px",
                }}
              >
                {user?.email?.charAt(0)}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                  }}
                >
                  {user?.displayName ||
                    "Minimalist User"}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            {/* MENU */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {/* PROFILE */}
              <Button
                onClick={() =>
                  setActiveTab("profile")
                }
                sx={{
                  justifyContent: "flex-start",
                  gap: 2,
                  color: "#000",
                  bgcolor:
                    activeTab === "profile"
                      ? "#e9e9e9"
                      : "transparent",
                  borderRadius: "14px",
                  p: 2,
                  border:
                    activeTab === "profile"
                      ? "2px solid #111"
                      : "none",
                }}
              >
                <PersonOutlineOutlinedIcon />

                <Box
                  sx={{ textAlign: "left" }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      textTransform:
                        "none",
                    }}
                  >
                    Profile
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                      textTransform:
                        "none",
                    }}
                  >
                    Personal info
                  </Typography>
                </Box>
              </Button>

              {/* ORDERS */}
              <Button
                onClick={() =>
                  setActiveTab("orders")
                }
                sx={{
                  justifyContent: "flex-start",
                  gap: 2,
                  color: "#000",
                  bgcolor:
                    activeTab === "orders"
                      ? "#e9e9e9"
                      : "transparent",
                  borderRadius: "14px",
                  p: 2,
                  border:
                    activeTab === "orders"
                      ? "2px solid #111"
                      : "none",
                }}
              >
                <Inventory2OutlinedIcon />

                <Box
                  sx={{ textAlign: "left" }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      textTransform:
                        "none",
                    }}
                  >
                    My Orders
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                      textTransform:
                        "none",
                    }}
                  >
                    Order history
                  </Typography>
                </Box>
              </Button>

              {/* ADDRESS */}
              <Button
                onClick={() =>
                  setActiveTab("address")
                }
                sx={{
                  justifyContent: "flex-start",
                  gap: 2,
                  color: "#000",
                  bgcolor:
                    activeTab === "address"
                      ? "#e9e9e9"
                      : "transparent",
                  borderRadius: "14px",
                  p: 2,
                  border:
                    activeTab === "address"
                      ? "2px solid #111"
                      : "none",
                }}
              >
                <LocationOnOutlinedIcon />

                <Box
                  sx={{ textAlign: "left" }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      textTransform:
                        "none",
                    }}
                  >
                    Addresses
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                      textTransform:
                        "none",
                    }}
                  >
                    Shipping & billing
                  </Typography>
                </Box>
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
              justifyContent: "flex-start",
              gap: 1,
              color: "red",
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
            p: 4,
            overflowY: "auto",
          }}
        >
          {/* PROFILE */}
          {activeTab === "profile" && (
            <Box>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 700,
                  mb: 4,
                }}
              >
                Profile Details
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: 3,
                }}
              >
                <TextField
                  label="First Name"
                  fullWidth
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(
                      e.target.value
                    )
                  }
                />

                <TextField
                  label="Last Name"
                  fullWidth
                  value={lastName}
                  onChange={(e) =>
                    setLastName(
                      e.target.value
                    )
                  }
                />

                <TextField
                  label="Email"
                  fullWidth
                  value={
                    user?.email || ""
                  }
                  disabled
                />

                <TextField
                  label="Phone"
                  fullWidth
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                />
              </Box>

              {/* SAVE BUTTON */}
              <Button
                variant="contained"
                onClick={handleSaveProfile}
                sx={{
                  mt: 4,
                  bgcolor: "#111",
                  borderRadius: "10px",
                  textTransform:
                    "none",
                  px: 5,
                  height: "50px",

                  "&:hover": {
                    bgcolor: "#000",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          )}

          {/* ORDERS */}
          {activeTab === "orders" && (
            <Box>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 700,
                  mb: 4,
                }}
              >
                My Orders
              </Typography>

              <Box
                sx={{
                  height: "200px",
                  border:
                    "1px solid #e5e5e5",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#666",
                }}
              >
                No orders found.
              </Box>
            </Box>
          )}

          {/* ADDRESS */}
          {activeTab === "address" && (
            <Box>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 700,
                  mb: 4,
                }}
              >
                Saved Addresses
              </Typography>

              <Box
                sx={{
                  border:
                    "1px dashed #ddd",
                  borderRadius: "20px",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{
                    fontSize: "70px",
                    color: "#777",
                    mb: 2,
                  }}
                />

                <Typography
                  sx={{
                    mb: 3,
                    color: "#666",
                  }}
                >
                  No addresses saved yet
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#111",
                    borderRadius: "10px",
                    textTransform:
                      "none",
                    px: 4,

                    "&:hover": {
                      bgcolor: "#000",
                    },
                  }}
                >
                  Add Your First Address
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileModal;