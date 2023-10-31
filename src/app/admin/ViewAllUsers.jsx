import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsers, deleteUserById } from "../../api/user"; // Replace with appropriate API calls
import { useSelector } from "react-redux";
import {
  Container,
  IconButton,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const ViewAllUsers = () => {
  const { accessToken } = useSelector((state) => state.auth.value);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarTransition, setSnackbarTransition] = React.useState(undefined);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  // Define the columns for the DataGrid
  const columns = [
    { field: "userId", headerName: "User ID", flex: 0.5 },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      //   align: "center",
      //   headerAlign: "center",
    },
    { field: "email", headerName: "Email", flex: 2, headerAlign: "center" },
    { field: "phoneNumber", headerName: "Phone Number", flex: 0.8 },
    {
      field: "role",
      headerName: "Is Admin",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value === "ROLE_ADMIN" ? (
          <CheckIcon color="success" fontSize="medium" />
        ) : (
          <CloseIcon color="error" fontSize="medium" />
        ),
    },
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => handleDeleteClick(params.row)}
            aria-label="delete"
            color="error"
            disabled={params.row.role === "ROLE_ADMIN"}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

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

  useEffect(() => {
    // Make an API call to fetch the list of users
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUsers(accessToken);
        setTimeout(() => {
          setLoading(false);
          setUsers(res);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUsers();
  }, [accessToken]);

  const handleDeleteClick = (row) => {
    // Set the user to delete and open the delete dialog
    if (row.role !== "ROLE_ADMIN") {
      setUserToDelete(row);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    // Perform the delete operation using the API
    if (userToDelete) {
      try {
        await deleteUserById(userToDelete.userId, accessToken);
        const updatedUsers = users.filter(
          (user) => user.userId !== userToDelete.userId
        );
        setLoading(true);
        openSnackbar("User deleted successfully!", TransitionUp);
        setTimeout(() => {
          setLoading(false);
          setUsers(updatedUsers);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "50px", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          All Users
        </Typography>
        <p>
          This page displays all registered users. You can manage and view user
          details below. Users with the ADMIN role cannot be deleted.
        </p>
      </Paper>
      <Container component="main" maxWidth="lg">
        <div style={{ height: "100vh", width: "100%", padding: "5% 2%" }}>
          <DataGrid
            getRowId={(row) => row.userId}
            loading={loading}
            columns={columns}
            rows={users}
            pageSize={10}
          />
        </div>
        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            {userToDelete && (
              <div>
                <p>Are you sure you want to delete this user?</p>
                <p>
                  <strong>User ID:</strong> {userToDelete.userId}
                </p>
                <p>
                  <strong>Username:</strong> {userToDelete.username}
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
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
      </Container>
    </>
  );
};

export default ViewAllUsers;
