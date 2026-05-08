import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Box } from "@mui/material";

const StarRating = ({ rating = 0 }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            // full star
            stars.push(<StarIcon key={i} sx={{ color: "#000000", fontSize: '20px' }} />);
        } else if (rating >= i - 0.5) {
            // half star
            stars.push(<StarHalfIcon key={i} sx={{ color: "#000000", fontSize: '20px' }} />);
        } else {
            // empty star
            stars.push(<StarBorderIcon key={i} sx={{ color: "#000000", fontSize: '20px' }} />);
        }
    }

    return <Box sx={{ display: "flex", gap: "2px" }}>{stars}</Box>;
};

export default StarRating;