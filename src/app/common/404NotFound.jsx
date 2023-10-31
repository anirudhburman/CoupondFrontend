import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material"; // Updated import
import GhostImg from "../../assets/ghost-img.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ContainerStyled = styled(Container)({
  // Use styled to style the Container
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  maxWidth: "100%",
  padding: (theme) => theme.spacing(2),
});

const GhostColumn = styled(Grid)({
  // Use styled to style the Ghost Column
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ContentColumn = styled(Grid)({
  // Use styled to style the Content Column
  padding: (theme) => theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const GhostImage = styled("img")({
  // Use styled to style the Ghost Image
  maxWidth: "450px",
});

const NotFound404 = () => {
  const { roles } = useSelector((state) => state.auth.value);
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isItDarkMode = useSelector((state) => state.isDarkTheme.value);

  const GhostShadow = styled("div")({
    width: "230px",
    height: "24px",
    backgroundColor: !isItDarkMode ? "hsla(38, 21%, 19%, 0.16)" : "#c2c4c4",
    margin: "0 auto",
    borderRadius: "50%",
    filter: "blur(7px)",
    animation: "shadow 1.8s infinite alternate",
    bottom: "0", // Position it at the bottom of the ghost column
  });

  useEffect(() => {
    const sr = ScrollReveal({
      distance: "90px",
      duration: 3000,
    });

    sr.reveal(".home-data", { origin: "top", delay: 400 });
    sr.reveal(".home-img", { origin: "bottom", delay: 600 });
    sr.reveal(".home-footer", { origin: "bottom", delay: 800 });
  }, []);

  return (
    <ContainerStyled>
      <Grid container spacing={2}>
        {/* Content Column */}
        <ContentColumn item xs={12} md={5}>
          <Box className="home-data">
            <Typography variant="h2">Error 404</Typography> <br />
            <Typography variant="h4">Hey Buddy</Typography>
            <Typography variant="body1">
              <p>We can't seem to find the page you are looking for.</p>
            </Typography>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to={isAdmin ? "/dashboard" : "/"}
            >
              Go Home
            </Button>
          </Box>
        </ContentColumn>
        {/* Ghost Column */}
        <GhostColumn item xs={12} md={7}>
          <Box className="home-img">
            <GhostImage src={GhostImg} alt="ghost" />
            <GhostShadow className="home-shadow" />
          </Box>
        </GhostColumn>
      </Grid>
    </ContainerStyled>
  );
};

export default NotFound404;
