import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const LightBox = ({ item }) => {
  const images = [
    item.img1,
    item.img2,
    item.img3,
    item.img4,
    item.img5,
  ].filter(Boolean);

  const [open, setOpen] = useState(false);

  // Default big image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ width: "100%" }}>

      {/* BIG IMAGE */}
      <Box
        component="img"
        src={selectedImage}
        alt="main-product"
        onClick={handleOpen}
        sx={{
          width: "auto",
          height: {
            xs: 320,
            sm: 450,
            md: 450,
          },
          objectFit: "fill",
          borderRadius: 2,
          cursor: "pointer",
          border: "1px solid #e0e0e0",
        }}
      />

      {/* SMALL THUMBNAILS */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 2,
          overflowX: "auto",
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`thumb-${index}`}
            onClick={() => setSelectedImage(img)}
            sx={{
              width: 80,
              height: 80,
              objectFit: "fill",
              borderRadius: 2,
              cursor: "pointer",
              border:
                selectedImage === img
                  ? "2px solid gray"
                  : "1px solid #ddd",
              transition: "0.3s",
            }}
          />
        ))}
      </Box>

      {/* LIGHTBOX */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
      >
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            backgroundColor: "#000",
          }}
        >
          {/* CLOSE BUTTON */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "#fff",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

         
          <Box
            component="img"
            src={selectedImage}
            alt="full-preview"
            sx={{
              width: "100%",
              maxHeight: "88vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LightBox;