import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import { SavingsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
  Switch,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../features/isDarkTheme";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth";
import { logoutUser } from "../../features/users";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 30,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#57e0d7",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#57e0d7"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#162726" : "#fbfefe",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#1d3533" : "#232929",
    width: 25,
    height: 25,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "red" : "#2bbab2",
    borderRadius: 20 / 2,
  },
}));

export default function HideAppBar(props) {
  const navigate = useNavigate();
  const { isLoggedIn, username, roles } = useSelector(
    (state) => state.auth.value
  );
  const isItDarkTheme = useSelector((state) => state.isDarkTheme.value);
  const dispatch = useDispatch();
  const isAdmin = roles.includes("ROLE_ADMIN");
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  const handleLogout = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
    setOpenLogoutDialog(false);
    navigate("/");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            {/* <SavingsRoundedIcon fontSize="large" /> */}
            {isAdmin ? (
              <Link
                component={RouterLink}
                to="/dashboard"
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
                  Coupond Admin
                </Typography>
              </Link>
            ) : (
              <Link
                component={RouterLink}
                to="/"
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
            )}

            <Box sx={{ flexGrow: 1 }} />
            <Box display="flex" justifyContent="flex-end">
              {/* {isAdmin ? : } */}
              {isItDarkTheme ? (
                <>
                  {isAdmin ? (
                    <>
                      <Button component={RouterLink} to="/viewAllCoupons">
                        View All Coupons
                      </Button>
                      <Button component={RouterLink} to="/viewAllUsers">
                        View All Users
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button component={RouterLink} to="/browseAllCoupons">
                        Browse Coupons
                      </Button>
                      <Button component={RouterLink} to="/contact">
                        Contact Us
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {isAdmin ? (
                    <>
                      <Button
                        component={RouterLink}
                        to="/viewAllCoupons"
                        variant="contained"
                        style={{ boxShadow: "none", padding: 8 }}
                      >
                        View All Coupons
                      </Button>
                      <Button
                        component={RouterLink}
                        to="/viewAllUsers"
                        variant="contained"
                        style={{ boxShadow: "none", padding: 8 }}
                      >
                        View All Users
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        component={RouterLink}
                        to="/browseAllCoupons"
                        variant="contained"
                        style={{ boxShadow: "none", padding: 8 }}
                      >
                        Browse Coupons
                      </Button>
                      <Button
                        component={RouterLink}
                        to="/contact"
                        variant="contained"
                        style={{ boxShadow: "none", padding: 8 }}
                      >
                        Contact Us
                      </Button>
                    </>
                  )}
                </>
              )}
              {isLoggedIn ? (
                <>
                  <ButtonGroup
                    variant="contained"
                    aria-label="contained primary button group"
                    style={{ marginLeft: "1em" }}
                    color="primary"
                  >
                    <Button onClick={handleLogout}>Logout</Button>
                    {isAdmin ? (
                      <Button component={RouterLink} to="/adminRegister">
                        Register Admin
                      </Button>
                    ) : null}
                  </ButtonGroup>
                  <Tooltip title="Profile">
                    <IconButton
                      onClick={() => {
                        navigate("/profile");
                      }}
                      sx={{ p: 0, ml: 2 }}
                    >
                      <Avatar
                        sx={{ bgcolor: isItDarkTheme ? "#57e0d7" : "#232929" }}
                        alt={username.toUpperCase()}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <ButtonGroup
                  variant="contained"
                  aria-label="contained primary button group"
                  style={{ marginLeft: "1em" }}
                  color="primary"
                >
                  <Button component={RouterLink} to="/login">
                    Sign In
                  </Button>
                  <Button component={RouterLink} to="/userRegister">
                    Sign Up
                  </Button>
                </ButtonGroup>
              )}
            </Box>
            <FormGroup sx={{ ml: 1 }}>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={isItDarkTheme}
                    onChange={() => dispatch(changeTheme())}
                  />
                }
              />
            </FormGroup>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {/* Logout Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
