import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SavingsIcon from "@mui/icons-material/Savings";
import { SavingsOutlined } from "@mui/icons-material";

const ProductHeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "90vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

function HeroLayout(props) {
  const { sxBackground, children } = props;

  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <img
          src="/static/themes/onepirate/productHeroWonder.png"
          alt="wonder"
          width="147"
          height="80"
        /> */}
        {/* <SavingsOutlined */}
        <SavingsIcon
          fontSize="large"
          style={{ width: "2.5em", height: "2.5em" }}
        />
        {children}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.7,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        <Box
          //   component="img"
          //   src={ArrowDownwardIcon}
          height="16"
          width="12"
          //   alt="arrow down"
          sx={{ position: "absolute", bottom: 32 }}
        >
          <ArrowDownwardIcon />
        </Box>
      </Container>
    </ProductHeroLayoutRoot>
  );
}

HeroLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default HeroLayout;
