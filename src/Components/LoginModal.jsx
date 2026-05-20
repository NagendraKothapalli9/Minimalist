// LoginModal.jsx

import React, { useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

const LoginModal = ({
  open,
  onClose,
  setUser,
  openProfile,
}) => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isSignup, setIsSignup] =
    useState(false);

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  if (!open) return null;

  /* SAVE USER */
  const saveUserData = (firebaseUser) => {
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName:
        firebaseUser.displayName || "",
      photoURL:
        firebaseUser.photoURL || "",
    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // GOOGLE LOGIN
  const googleLogin = async () => {
    try {
      const provider =
        new GoogleAuthProvider();

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      saveUserData(result.user);

      setSuccessMessage(
        result.user.displayName ||
          result.user.email
      );

      setTimeout(() => {
        setSuccessMessage("");

        onClose();

        openProfile();
      }, 2000);
    } catch (error) {
      console.log(error);

      alert(
        error.code.replace("auth/", "")
      );
    }
  };

  // EMAIL LOGIN
  const emailLogin = async () => {
    try {
      if (!email || !password) {
        return alert(
          "Please fill all fields"
        );
      }

      const result =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      saveUserData(result.user);

      setSuccessMessage(
        result.user.email
      );

      setTimeout(() => {
        setSuccessMessage("");

        onClose();

        openProfile();
      }, 2000);
    } catch (error) {
      console.log(error);

      alert(
        error.code.replace("auth/", "")
      );
    }
  };

  // EMAIL SIGNUP
  const emailSignup = async () => {
    try {
      if (!email || !password) {
        return alert(
          "Please fill all fields"
        );
      }

      if (password.length < 6) {
        return alert(
          "Password must be at least 6 characters"
        );
      }

      const result =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      saveUserData(result.user);

      setSuccessMessage(
        result.user.email
      );

      setTimeout(() => {
        setSuccessMessage("");

        onClose();

        openProfile();
      }, 2000);
    } catch (error) {
      console.log(error);

      alert(
        error.code.replace("auth/", "")
      );
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
          width: {
            xs: "100%",
            md: "900px",
          },

          height: {
            xs: "auto",
            md: "560px",
          },

          bgcolor: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          position: "relative",
        }}
      >
        {/* CLOSE BUTTON */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 15,
            top: 15,
            zIndex: 10,
          }}
        >
          <CloseIcon
            sx={{ fontSize: 30 }}
          />
        </IconButton>

        {/* LEFT IMAGE */}
        <Box
          sx={{
            flex: 1,

            display: {
              xs: "none",
              md: "block",
            },

            position: "relative",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dam89m7fe/image/upload/v1778824351/login_modal_bkjyea.avif"
            alt="login"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* RIGHT SECTION */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {successMessage ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent:
                  "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "32px",
                  mb: 2,
                }}
              >
                🎉
              </Typography>

              <Typography
                sx={{
                  fontSize: "34px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                Congratulations!
                <br />
                Verification
                Successful
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "#666",
                  fontSize: "15px",
                }}
              >
                {successMessage}
              </Typography>
            </Box>
          ) : (
            <>
              {/* LOGO */}
              <Box
                component="img"
                src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898230/nav_logo_l4jgwz.webp"
                alt="logo"
                sx={{
                  width: "40%",
                  height: "40%",
                  objectFit: "cover",
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  color: "#666",
                  mb: 4,
                  mt: 1,
                }}
              >
                {isSignup
                  ? "Create your account"
                  : "Sign in to continue shopping"}
              </Typography>

              {/* EMAIL */}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                sx={{ mb: 2 }}
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              {/* PASSWORD */}
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                sx={{ mb: 3 }}
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              {/* LOGIN BUTTON */}
              <Button
                fullWidth
                variant="contained"
                onClick={
                  isSignup
                    ? emailSignup
                    : emailLogin
                }
                sx={{
                  height: "52px",
                  bgcolor: "#000",
                  borderRadius: "10px",
                  textTransform:
                    "none",
                  fontSize: "16px",
                  fontWeight: 600,

                  "&:hover": {
                    bgcolor: "#111",
                  },
                }}
              >
                {isSignup
                  ? "Create Account"
                  : "Login"}
              </Button>

              {/* TOGGLE */}
              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#666",
                }}
                onClick={() =>
                  setIsSignup(
                    !isSignup
                  )
                }
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </Typography>

              <Divider
                sx={{ my: 4 }}
              >
                OR
              </Divider>

              {/* GOOGLE LOGIN */}
              <Button
                fullWidth
                startIcon={
                  <GoogleIcon />
                }
                onClick={googleLogin}
                sx={{
                  height: "54px",

                  border:
                    "1px solid #ddd",

                  color: "#000",

                  borderRadius:
                    "10px",

                  textTransform:
                    "none",

                  fontSize: "16px",

                  fontWeight: 600,

                  "&:hover": {
                    bgcolor:
                      "#f5f5f5",
                  },
                }}
              >
                Continue with Google
              </Button>

              {/* TERMS */}
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#777",
                  mt: 4,
                  lineHeight: 1.8,
                }}
              >
                By continuing you
                agree to our
                <br />
                Terms & Conditions
                and Privacy Policy
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginModal;