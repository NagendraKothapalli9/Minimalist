import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LightBox = ({ items }) => {
  const images = [
    items?.img1,
    items?.img2,
    items?.img3,
    items?.img4,
    items?.img5,
  ].filter(Boolean);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(items?.src);

  useEffect(() => {
    if (images.length > 0) setSelectedImage(images[0]);
  }, [items,images]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* MAIN IMAGE CONTAINER */}
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "zoom-in",
          overflow: "hidden"
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          component="img"
          src={selectedImage}
          alt="product"
          sx={{
            width: "auto",
            height: { xs: '300px', sm: '400px', md: '900px' },
            objectFit: "",
            transition: "0.3s"
          }}
        />
      </Box>

      {/* THUMBNAILS ROW */}
      <Box sx={{ display: "flex", gap: 1.5, mt: 2, overflowX: "auto", py: 1 }}>
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            onClick={() => setSelectedImage(img)}
            sx={{
              width: "auto",
              height: 100,
              objectFit: "fill",
              borderRadius: 1,
              cursor: "pointer",
              border: selectedImage === img ? "1px solid gray" : "1px solid #ddd",
              opacity: selectedImage === img ? 1 : 0.6,
              transition: "0.2s"
            }}
          />
        ))}
      </Box>

      {/* ZOOM DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogContent sx={{ p: 0, position: "relative", bgcolor: "#fff" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 10, right: 10, zIndex: 10, bgcolor: 'white' }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="full" style={{ width: "100%", maxHeight: "90vh", objectFit: "contain" }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LightBox;