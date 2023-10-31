import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function Contact() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarTransition, setSnackbarTransition] = React.useState(undefined);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const openSnackbar = (message, transition) => {
    setSnackbarMessage(message);
    setSnackbarTransition(() => transition);
    setSnackbarOpen(true);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: "50px", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <p>
          Fill up the form and our team will get back to you within 24 hours.
        </p>
      </Paper>
      <Grid>
        <Card
          style={{ maxWidth: 450, padding: "20px 5px", margin: "50px auto" }}
        >
          <CardContent>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter phone number"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Type your message here"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() =>
                      openSnackbar(
                        "Thank you! We will contact you very soon",
                        TransitionUp
                      )
                    }
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
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
        <Alert variant="filled" severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Contact;
