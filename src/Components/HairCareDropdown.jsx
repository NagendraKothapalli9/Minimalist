// HairCareDropdown.jsx
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const HairCareDropdown = () => {
  const [hover, setHover] = useState(false);

  // Columns data
  const shopByConcern = ["Hair Fall", "Damaged Hair", "Dandruff", "Scalp Irritation", "Frizzy Hair", "Dull Hair", "Oily Scalp", "Hair Thinning"];
  const shopByIngredients = ["Capixyl", "Maleic Acid", "Peptide", "Carnitine"];
  const hairCare = ["Treat", "Shampoo", "Mask"];

  const imageUrl = "https://res.cloudinary.com/dam89m7fe/image/upload/v1779269219/hair_care_example.avif";
  const productName = "New Launch: Hydrating Factors 7.3% Hair Shampoo";

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
        Hair Care
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
            gap: 4,
            p: 3,
          }}
        >
          {/* Column 1 */}
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Shop by Concern</Typography>
            {shopByConcern.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Box>

          {/* Column 2 */}
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Shop by Ingredients</Typography>
            {shopByIngredients.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Box>

          {/* Column 3 */}
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Hair</Typography>
            {hairCare.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Box>

          {/* Right Image */}
          <Box sx={{ textAlign: "center" }}>
            <img src={imageUrl} alt="Hair Care Product" style={{ width: "180px", height: "220px", objectFit: "cover" }} />
            <Button sx={{ mt: 1 }} variant="contained" size="small">Shop Now</Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>{productName}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HairCareDropdown;