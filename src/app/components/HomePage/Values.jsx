import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function Values() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Container sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}>
        <Box sx={{ pointerEvents: "none", position: "absolute", top: -180 }} />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={{ height: 55 }}>
                <PriceCheckIcon
                  fontSize="large"
                  style={{ width: "1.6em", height: "1.6em" }}
                ></PriceCheckIcon>
              </Box>
              <Typography variant="h5" sx={{ my: 5 }}>
                {"best value for money".toUpperCase()}
              </Typography>
              <Typography variant="h6">
                {
                  "From the latest trendy boutique to the iconic brands with thousands of products"
                }

                {", go buy anything and save money with just a few clicks."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={{ height: 55 }}>
                <LocalConvenienceStoreIcon
                  fontSize="large"
                  style={{ width: "1.6em", height: "1.6em" }}
                ></LocalConvenienceStoreIcon>
              </Box>
              <Typography variant="h5" sx={{ my: 5 }}>
                USE ANYWHERE
              </Typography>
              <Typography variant="h6">
                {
                  "Go shopping online or visit any of our partner stores, our coupons can be used anywhere and everywhere.. "
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={{ height: 55 }}>
                <LocalOfferIcon
                  fontSize="large"
                  style={{ width: "1.6em", height: "1.6em" }}
                ></LocalOfferIcon>
              </Box>
              <Typography variant="h5" sx={{ my: 5 }}>
                EXCLUSIVE OFFERS
              </Typography>
              <Typography variant="h6">
                {"By registering, you will access specially negotiated offers "}
                {"that you will not find anywhere else."}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Values;
