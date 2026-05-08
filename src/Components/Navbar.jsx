import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Theme } from "../GlobalStyles";
import NavSlider from "./NavSlider";


const MuiNavbar = () => {
    const menuItems = [
        "Shop",
        "Best Sellers",
        "Skin & Body Care",
        "Baby Care",
        "Hair Care",
        "AI Assistants",
        "Track Order"
    ];

    return (
        <Box>
            <NavSlider />
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#fff",
                    color: "#000000",
                    boxShadow: "none",
                    borderBottom: "1px solid #eee",
                    px: 4,

                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>


                    <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898230/nav_logo_l4jgwz.webp" alt="logo" height={'30px'} />


                    <Box sx={{ display: "flex", gap: 5, }}>
                        {menuItems.map((item, index) => (
                            <Typography
                                key={index}

                                sx={{
                                    position: "relative",
                                    display: "inline-block",
                                    cursor: "pointer",

                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        bottom: -2,
                                        width: "100%",
                                        height: "2px",
                                        backgroundColor: "black",

                                        transform: "scaleX(0)",
                                        transformOrigin: "left",
                                        transition: "transform 0.3s ease",
                                    },

                                    "&:hover::after": {
                                        transform: "scaleX(1)",
                                    }, ...Theme.font16SemiBold,
                                }}
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>


                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton>
                            <StarBorderIcon sx={{ color: 'black', fontSize: '28px' }} />
                        </IconButton>

                        <IconButton >
                            <SearchIcon sx={{ color: 'black', fontSize: '28px' }} />
                        </IconButton>

                        <IconButton>
                            <PersonOutlineOutlinedIcon sx={{ color: 'black', fontSize: '28px' }} />
                        </IconButton>

                        <IconButton>
                            <Badge badgeContent={5} sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: "black",
                                    color: "white"
                                }
                            }}>
                                <ShoppingCartOutlinedIcon sx={{ color: 'black', fontSize: '28px' }} />
                            </Badge>
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MuiNavbar;