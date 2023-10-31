import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  Alert,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import couponsImg from "../../assets/couponsImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserById,
  deleteUserByUsername,
  getUserByUsername,
  updateUser,
} from "../../api/user";
import { fetchUser, logoutUser, updateUserState } from "../../features/users";
import PastCouponsDrawer from "../common/PastCouponsDrawer";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { logout } from "../../features/auth";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import "../../assets/styles.css";

const StyledButton = styled(Button)(({ theme }) => ({
  position: "relative",
  height: 100,
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.6,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, accessToken, roles } = useSelector(
    (state) => state.auth.value
  );
  const user = useSelector((state) => state.users.value);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isAdmin = roles.includes("ROLE_ADMIN");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(/^[789]\d{9}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    set,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    reset(user); // Populate the form fields with user data
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleEditProfile = async (data) => {
    // console.log(data);
    const dto = {
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
    try {
      const res = await updateUser(dto, accessToken);
      dispatch(updateUserState(res));
      setIsEditModalOpen(false);
      setIsSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteProfile = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const res = await deleteUserById(user.userId, accessToken);
      setTimeout(() => {
        setIsLoading(false);
        setIsDeleteDialogOpen(false);
        navigate("/");
        dispatch(logout());
        dispatch(logoutUser());
      }, 2000);
    } catch (error) {
      // Handle the error and show it in the snackbar
      setDeleteError("An error occurred while deleting the profile.");
      setIsSnackbarOpen(true);
    } finally {
      setIsLoading(false); // Reset loading state
      setIsDeleteDialogOpen(false); // Close the delete dialog
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserByUsername(username, accessToken);
      dispatch(fetchUser(res));
    };
    getUser();
  }, [accessToken]);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: "5%",
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Avatar
                src="your-avatar-image.jpg"
                alt={user.username.toUpperCase()}
                sx={{
                  width: 150,
                  height: 150,
                  mx: "auto",
                  mt: 5,
                  fontSize: "4rem",
                }}
              />
              <Typography variant="h6" sx={{ textAlign: "center", mt: 1 }}>
                {user.username.toUpperCase()}
              </Typography>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  startIcon={<EditIcon />}
                  size="small"
                  //   variant="outlined"
                  variant="contained"
                  color="primary"
                  onClick={handleOpenEditModal}
                >
                  Edit Profile
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  size="small"
                  //   variant="outlined"
                  variant="contained"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={handleOpenDeleteDialog}
                >
                  Delete Profile
                </Button>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2.1} p={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <strong>Username:</strong> {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <strong>PhoneNumber:</strong> (+91) {user.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {isAdmin ? null : (
                  <Grid item xs={12}>
                    <StyledButton focusRipple onClick={handleOpenDrawer}>
                      <ImageSrc
                        style={{
                          backgroundImage: `url(${couponsImg})`,
                        }}
                      />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: "relative",
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          View your coupons
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </StyledButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <PastCouponsDrawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            list={user.listOfCoupons}
          />
          <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(handleEditProfile)}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={user.username}
                  disabled
                  style={{ margin: "0.5em 0" }}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      style={{ margin: "0.5em 0" }}
                      label="Email"
                      {...field}
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email && "Email is required"}
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      style={{ margin: "0.5em 0" }}
                      label="Phone Number"
                      {...field}
                      fullWidth
                      error={!!errors.phoneNumber}
                      helperText={
                        errors.phoneNumber && errors.phoneNumber.message
                      }
                    />
                  )}
                />
                <DialogActions>
                  <Button onClick={handleCloseEditModal} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Update Profile
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
          {/* <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Profile updated successfully!
            </Alert>
          </Snackbar> */}
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            {deleteError ? (
              <Alert
                variant="filled"
                onClose={handleSnackbarClose}
                severity="error"
                // icon={<ErrorIcon fontSize="inherit" />}
              >
                {deleteError}
              </Alert>
            ) : (
              <Alert
                variant="filled"
                onClose={handleSnackbarClose}
                severity="success"
              >
                Profile updated
              </Alert>
            )}
          </Snackbar>
          {/* Delete Profile Confirmation Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            // onClose={handleCloseDeleteDialog}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Delete Profile</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete your profile? This action cannot
                be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleCloseDeleteDialog}
                color="primary"
                disabled={isLoading} // Disable the button while loading
              >
                Cancel
              </Button>
              <LoadingButton // Use LoadingButton for the Delete button
                loading={isLoading}
                onClick={handleDeleteProfile}
                variant="contained"
                color="error"
              >
                Delete
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Container>
  );
}
