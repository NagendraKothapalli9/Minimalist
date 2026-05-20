// ShopDropdown.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataActionInitiate } from "../redux/actions/getProductActions";
import { Box, Typography } from "@mui/material";

const ShopDropdown = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.getproductdata);
  const { data, loading, error } = productState;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getProductDataActionInitiate());
  }, [dispatch]);

  const shopProducts = data.filter((item) => item.categories === "shop");

  return (
    <Box
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      sx={{ position: "relative" }}
    >
      <Typography
        sx={{
          cursor: "pointer",
          fontWeight: 600,
          padding: "8px 12px",
          "&:hover": { color: "primary.main" },
        }}
      >
        Shop
      </Typography>

      {visible && (
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
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography>Error: {error}</Typography>}
          {!loading &&
            !error &&
            shopProducts.map((product) => (
              <Box
                key={product.id}
                sx={{ width: "120px", textAlign: "center", cursor: "pointer" }}
              >
                <img
                  src={product.img}
                  alt={product.Name}
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                />
                <Typography variant="body2">{product.Name}</Typography>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ShopDropdown;