import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useSelector } from "react-redux";
import { SavingsOutlined } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import FooterDivider from "./FooterDivider";

const Root = styled("div")({
  backgroundColor: (theme) => theme.palette.background.paper,
});

function Copyright() {
  return (
    <Typography variant="caption" color="text.secondary">
      {" Copyright © "}
      <Link component={RouterLink} to="/">
        coupond.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // Align logo and social buttons in a row
});

const LogoIcon = styled(Avatar)({
  backgroundColor: "#007bff",
  fontSize: 32,
  width: 40,
  height: 40,
});

const useStyles = {
  socialLink: {
    marginRight: "16px",
  },
};

const Footer = () => {
  const isItDarkTheme = useSelector((state) => state.isDarkTheme.value);
  const { roles } = useSelector((state) => state.auth.value);
  const isAdmin = roles.includes("ROLE_ADMIN");

  return (
    <Root>
      {/* <Divider
        style={{
          backgroundColor: isItDarkTheme ? "#57e0d7" : "#232929",
          height: "3px",
        }}
      /> */}
      <FooterDivider></FooterDivider>
      <Container>
        <Box pt={8} pb={2}>
          <Header>
            <Box display="flex" alignItems="center">
              <Link
                component={RouterLink}
                to={!isAdmin ? "/" : "/dashboard"}
                underline="none"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                }}
              >
                <SavingsOutlined fontSize="large" />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Coupond
                </Typography>
              </Link>
            </Box>
            <Box>
              <IconButton
                component={RouterLink}
                to="https://www.facebook.com/Anirudhbarman1?mibextid=ZbWKwL"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component={RouterLink}
                to="https://instagram.com/_little__kid__lover_?igshid=NzZlODBkYWE4Ng=="
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component={RouterLink}
                to="https://github.com/anirudhburman"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component={RouterLink}
                to="https://www.linkedin.com/in/anirudh-burman-692232211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Header>
        </Box>
        <Divider />
        <Box pt={2} pb={10}>
          <Box display="flex" justifyContent="center">
            <Typography variant="caption" color="textSecondary">
              Made with ❤️ by Anirudh Barman
              <Copyright />
            </Typography>
          </Box>
        </Box>
      </Container>
    </Root>
  );
};

export default Footer;
