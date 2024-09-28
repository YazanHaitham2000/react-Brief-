import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(135deg, rgba(74, 0, 224, 0.1), rgba(142, 45, 226, 0.1)), url(/assets/img/hero/h1_hero.png)`, // Gradient with transparency, followed by the image
        backgroundSize: "cover", // Cover the full background area
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // No repetition of the image
        width: "100vw", // Full width of the viewport
        height: "100vh", // Full height of the viewport
        display: "flex",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Container>
        <Grid container spacing={2} alignItems="center">
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", marginBottom: 2, lineHeight: 1.2 }}
            >
              Online learning <br /> platform
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.7rem", marginBottom: 4  , color : "white"}}
            >
             Master the art of web development with hands-on tutorials,
              interactive coding exercises, and real-world projects. Take your
              skills to the next level by learning from industry experts
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
