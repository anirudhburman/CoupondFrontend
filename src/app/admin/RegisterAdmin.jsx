import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { registerAdmin } from "../../api/user";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";

const required = "This field is required";
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
const phoneNumberPattern = /^[789]\d{9}$/;

function RegisterAdmin() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarTransition, setSnackbarTransition] = React.useState(undefined);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { accessToken } = useSelector((state) => state.auth.value);

  const openSnackbar = (message, transition) => {
    setSnackbarMessage(message);
    setSnackbarTransition(() => transition);
    setSnackbarOpen(true);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res = await registerAdmin(data, accessToken);
      console.log(res);
      if (res) {
        navigate("/viewAllUsers");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(
        error.response ? error.response.data.message : error.message
      );
      openSnackbar(
        error.response ? error.response.data.message : error.message,
        TransitionUp
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register an Admin
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="username"
                control={control}
                rules={{ required: required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    required
                    error={!!errors.username}
                    helperText={errors.username ? required : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: required,
                  pattern: {
                    value: phoneNumberPattern,
                    message:
                      "Invalid phone number (must start with 7, 8, or 9 and be 10 digits)",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Phone Number"
                    required
                    error={!!errors.phoneNumber}
                    helperText={
                      errors.phoneNumber ? errors.phoneNumber.message : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{ required: required, pattern: emailPattern }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    required
                    error={!!errors.email}
                    helperText={
                      errors.email
                        ? errors.email.type === "required"
                          ? required
                          : "Invalid email address"
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                rules={{ required: required, pattern: passwordPattern }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={
                      errors.password
                        ? errors.password.type === "required"
                          ? required
                          : "Password must contain at least 6 characters, 1 capital letter, and 1 digit"
                        : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="agreement"
                control={control}
                rules={{ required: "You must agree to the terms" }}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label="They agree to the terms and conditions of Coupond Inc."
                  />
                )}
              />
              {errors.agreement && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "15px",
                    marginTop: "5px",
                  }}
                >
                  {errors.agreement.message}
                </p>
              )}
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading} // Use the loading prop
            onClick={!isLoading ? handleSubmit(onSubmit) : null}
          >
            Register
          </LoadingButton>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000} // Auto hide after 3 seconds
            onClose={handleClose}
            TransitionComponent={snackbarTransition}
            message={snackbarMessage}
            key={snackbarTransition ? snackbarTransition.name : ""}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert variant="filled" severity="error">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterAdmin;
