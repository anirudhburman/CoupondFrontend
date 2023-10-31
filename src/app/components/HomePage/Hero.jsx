import * as React from "react";
import HeroLayout from "./HeroLayout";
import { Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const backgroundImage =
  "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhdmluZ3N8ZW58MHx8MHx8fDA%3D";

export default function Hero() {
  const { isLoggedIn } = useSelector((state) => state.auth.value);
  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        // backgroundColor: `rgba(0,0,0,1)`,
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        We have the internet’s best coupons
      </Typography>
      <Divider color="#57e0d7" style={{ width: "10%", height: "0.5em" }} />
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 7 } }}
      >
        Stop wasting time and money — Coupond helps you <br /> find coupon codes
        for 5,000+ sites.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={Link}
        sx={{ minWidth: 200 }}
        to={isLoggedIn ? "/browseAllCoupons" : "/userRegister"}
      >
        {isLoggedIn ? "Explore" : "Register"}
      </Button>
      <Typography variant="caption" color="inherit" sx={{ mt: 2 }}>
        <strong>1.1 million</strong> members and counting
      </Typography>
    </HeroLayout>
  );
}
