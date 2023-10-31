import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Link } from "react-router-dom";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "#6a7c7b",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function HowItWorks() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        bgcolor: "#57e0d7",
        overflow: "hidden",
        color: "#232929",
      }}
    >
      <Container
        sx={{
          mt: 4,
          mb: 7,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box>
                  <LoginIcon
                    fontSize="large"
                    style={{ width: "1.6em", height: "1.6em" }}
                    sx={{ m: 2 }}
                  ></LoginIcon>
                </Box>
                <Typography variant="h5" align="center">
                  Register in seconds in just a few clicks and its 100% free.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box>
                  <LocalMallIcon
                    fontSize="large"
                    style={{ width: "1.6em", height: "1.6em" }}
                    sx={{ m: 2 }}
                  ></LocalMallIcon>
                </Box>
                <Typography variant="h5" align="center">
                  Select your favorite coupon from our wide range of partner
                  brands.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box>
                  <CardGiftcardIcon
                    fontSize="large"
                    style={{ width: "1.6em", height: "1.6em" }}
                    sx={{ m: 2 }}
                  ></CardGiftcardIcon>
                </Box>
                <Typography variant="h5" align="center">
                  {"Redeem the Coupon in the store or website and Enjoy! "}
                  {/* {"Your savings will no longer be alike."} */}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          size="large"
          variant="contained"
          component={Link}
          sx={{ mt: 8 }}
          style={{ backgroundColor: "#1d3533", color: "#f1f3f3" }}
          to="/browseAllCoupons"
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default HowItWorks;
