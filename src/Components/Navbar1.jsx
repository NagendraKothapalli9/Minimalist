import React, { useState } from "react";
import {
    AppBar, Toolbar, Typography, Box, IconButton, Badge,
    Drawer, List, ListItem, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Theme } from "../GlobalStyles";
import NavSlider from "./NavSlider";

const MuiNavbar1 = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        "Shop", "Best Sellers", "Skin & Body Care",
        "Baby Care", "Hair Care", "AI Assistants", "Track Order"
    ];

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const navItemStyles = {
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
        },
        ...Theme.font16SemiBold,
    };

    return (
        <Box>
            <NavSlider />
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: "none",
                    borderBottom: "1px solid #eee",
                    px: { xs: 0, md: 4 }, // Remove padding on mobile to fit 320px
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                    {/* --- MOBILE ONLY: Left Group (Toggle + Search) --- */}
                    <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
                        <IconButton onClick={handleDrawerToggle} sx={{ color: "black", p: 1 }}>
                            <MenuIcon />
                        </IconButton>
                        <IconButton sx={{ color: "black", p: 1 }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    {/* --- LOGO: Centered on Mobile, Left on Laptop --- */}
                    <Box sx={{
                        position: { xs: 'absolute', md: 'static' },
                        left: { xs: '50%' },
                        transform: { xs: 'translateX(-50%)', md: 'none' }
                    }}>
                        <Box
                            component="img"
                            src="https://res.cloudinary.com/dam89m7fe/image/upload/v1777898230/nav_logo_l4jgwz.webp"
                            alt="logo"
                            sx={{
                                height:{xs:'20px',md:'25px'} ,
                                width: 'auto', 
                                display: 'block'
                            }}
                        />
                    </Box>

                    {/* --- LAPTOP ONLY: Horizontal Menu --- */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
                        {menuItems.map((item, index) => (
                            <Typography key={index} sx={navItemStyles}>
                                {item}
                            </Typography>
                        ))}
                    </Box>

                    {/* --- ACTION ICONS --- */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Star: Visible on both, but custom sizing/order for mobile */}
                        <IconButton sx={{ color: "black", p: 1 }}>
                            <StarBorderIcon sx={{ fontSize: {md:'28px',xs:'25px'} }} />
                        </IconButton>

                        {/* Laptop Only Search & Person */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                            <IconButton sx={{ color: "black" }}>
                                <SearchIcon sx={{ fontSize: {md:'28px',xs:'25px'} }} />
                            </IconButton>
                            <IconButton sx={{ color: "black" }}>
                                <PersonOutlineOutlinedIcon sx={{ fontSize: {md:'28px',xs:'25px'} }} />
                            </IconButton>
                        </Box>

                        <IconButton sx={{ p: 1 }}>
                            <Badge badgeContent={6} sx={{
                                "& .MuiBadge-badge": { backgroundColor: "black", color: "white" }
                            }}>
                                <ShoppingCartOutlinedIcon sx={{ color: 'black', fontSize: {md:'28px',xs:'20px'}}} />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* --- MOBILE DRAWER (MENU) --- */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                PaperProps={{ sx: { width: "100%", maxWidth: "350px" } }}
            >
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ ...Theme.font16SemiBold, textTransform: 'uppercase' }}>Menu</Typography>
                        <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <List>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem sx={{ py: 1.5 }}>
                                    <Typography sx={Theme.font16SemiBold}>{item}</Typography>
                                </ListItem>
                                <Divider variant="middle" component="li" sx={{ ml: 0 }} />
                            </React.Fragment>
                        ))}
                        <ListItem sx={{ py: 1.5 }}>
                            <Typography sx={Theme.font16SemiBold}>Account</Typography>
                        </ListItem>
                    </List>
                    <Box sx={{ display: 'flex', gap: 2, p: 2, mt: 2 }}>
                        <EmailIcon sx={{ color: '#666' }} />
                        <FacebookIcon sx={{ color: '#666' }} />
                        <InstagramIcon sx={{ color: '#666' }} />
                        <YouTubeIcon sx={{ color: '#666' }} />
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MuiNavbar1;