// BabyCareDropdown.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const BabyCareDropdown = () => {
  const [hover, setHover] = useState(false);

  // Get products from Redux store
  const productState = useSelector((state) => state.getproductdata);
  const { data: products } = productState;

  // Filter for Baby Care
  const babyCareProducts = products.filter((item) => item.categories === "Baby Care");

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: "relative", cursor: "pointer" }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          padding: "8px 12px",
          "&:hover": { color: "primary.main" },
        }}
      >
        Baby Care
      </Typography>

      {hover && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            display: "flex",
            gap: 2,
            p: 2,
          }}
        >
          {babyCareProducts.map((product) => (
            <Box
              key={product.id}
              sx={{ width: "140px", textAlign: "center", cursor: "pointer" }}
            >
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
    </Box>
  );
};

export default BabyCareDropdown;