// SkinBodyCareDropdown.jsx
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const SkinBodyCareDropdown = () => {
  const [hover, setHover] = useState(false);

  // Data arrays for each column
  const shopByConcern = ["Acne", "Pigmentation", "Dryness", "UV Damage", "Underarm Darkness", "Oiliness", "Dullness", "Aging"];
  const shopByIngredients = ["Vitamin C", "BHA / Salicylic Acid", "Retinoid / Retinol", "Niacinamide", "UV Filters", "Ceramide"];
  const skinCare = ["Cleanse", "Tone", "Treat", "Moisturize", "SPF", "Under Eye"];
  const bodyCare = ["Cleanse", "Roll On", "Lotion"];
  const lipCare = ["Treat", "Protect"];

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
        Skin & Body Care
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
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Skin Care</Typography>
            {skinCare.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Box>

          {/* Column 4 */}
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Body Care</Typography>
            {bodyCare.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}

            <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>Lip</Typography>
            {lipCare.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5, cursor: "pointer" }}>
                {item}
              </Typography>
            ))}
          </Box>

          {/* Right Image */}
          <Box>
            <img
              src="https://res.cloudinary.com/dam89m7fe/image/upload/v1779269219/skin_body_care_example.avif"
              alt="Skin & Body Care"
              style={{ width: "180px", height: "220px", objectFit: "cover" }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SkinBodyCareDropdown;