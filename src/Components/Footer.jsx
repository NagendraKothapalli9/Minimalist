import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Marquee from "react-fast-marquee";
import { Theme } from "../GlobalStyles";
const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", mt: 5 }}>
      
      
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          color: "#000000",
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
           ...Theme.font16SemiBold,
           
        }}
      >
        <Marquee>
        <Typography variant="body2" sx={{ ...Theme.font16SemiBold,}}>
          Shampoos now come with lower MRPs, effective 22nd September,
          2025. <b>Know More!</b>
        </Typography>

        <Typography variant="body2" sx={{ ...Theme.font16SemiBold,}}>
          The 56th GST Council has reduced the tax on Haircare
          (HSN-3305) from 18% to 5%.
        </Typography>
        </Marquee>
      </Box>

     
      <Grid
        container
        spacing={6}
        sx={{
          px: { xs: 3, md: 8 },
          py: 8,
        }}
      >
        
        <Grid item xs={12} sm={6} md={4} sx={{ml:{md:4}}}>
          <Typography
            sx={{
              mb: 3,
              ...Theme.font16Regular,
            }}
          >
            Company Overview
          </Typography>

          {[
            "About Us",
            "Our values",
            "Privacy notice",
            "Cookie Policy",
            "Terms & conditions",
            "Disclaimer",
            "Corporate Information",
            "Media Outreach",
            "Distributor Queries",
            "Grievance Redressal",
          ].map((item, index) => (
            <Typography
              key={index}
              sx={{
                mb: 1.2,
                cursor: "pointer",
                color: "#ddd",
                transition: "0.3s",
                 ...Theme.font16Regular,
                "&:hover": {
                  color: "#fff",
                  pl: 1,
               
             

                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Grid>

       
        <Grid item xs={12} sm={6} md={4} sx={{mx:{md:25}}}>
          <Typography
            sx={{
              mb: 3,
              fontWeight: 600,
              fontSize: "18px",
              mx:"auto",
               justifyContent:'center',
              ...Theme.font16Regular,

            }}
          >
            Quick Links
          </Typography>

          {[
            "Knowledge",
            "FAQs",
            "Shipping Policy",
            "Return & refund policy",
            "Payment Policy",
            "Track order",
            "Download App",
          ].map((item, index) => (
            <Typography
              key={index}
              sx={{
                mb: 1.2,
                cursor: "pointer",
                color: "#ddd",
                transition: "0.3s",
                 ...Theme.font16Regular,
                "&:hover": {
                  color: "#fff",
                  pl: 1,
                  mx:"auto",
             

                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Grid>

        
        <Grid item xs={12} sm={12} md={4}>
          <Typography
            sx={{
              mb: 3,
              fontWeight: 600,
              fontSize: "18px",
              mx:"auto",
               justifyContent:'center',
              ...Theme.font16Regular,

            }}
          >
            Contact Us
          </Typography>

          <Typography sx={{ color: "#ddd", mb: 1, ...Theme.font15Regular,}}>
            Need help fast? Fill out our form or email
          </Typography>

          <Typography
            sx={{
              mb: 4,
              textDecoration: "underline",
              cursor: "pointer",
               ...Theme.font16Regular,
            }}
          >
            help@beminimalist.co
          </Typography>

          <Typography sx={{ color: "#ddd", mb: 1, ...Theme.font15Regular, }}>
            For gifting inquiries, write to us at
          </Typography>

          <Typography
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              fontSize:{md:Theme.font15Regular},
            }}
          >
            gifting@beminimalist.co
          </Typography>

          
          <Box>
            <IconButton sx={{ color: "#fff" }}>
              <MailOutlineOutlinedIcon />
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <FacebookIcon />
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <InstagramIcon />
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "#333" }} />

      {/* Bottom Footer */}
      <Box
        sx={{
          px: 4,
          py: 2,
          fontSize: "14px",
          color: "#ccc",
          textAlign: "center",
           ...Theme.font16Regular,
        }}
      >
        © 2026 Minimalist. All Rights Reserved.
      </Box>
    </Box>
  );
};

export default Footer;