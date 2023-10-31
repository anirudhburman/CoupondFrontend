import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  addCoupon,
  deleteCouponById,
  getAllCoupons,
  updateCoupon,
} from "../../api/coupon";
import { useSelector } from "react-redux";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Slide,
  Snackbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCouponDialog from "./EditCoupon";
import AddCouponDialog from "./AddCoupon";

const ViewAllCoupons = () => {
  const { accessToken } = useSelector((state) => state.auth.value);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarTransition, setSnackbarTransition] = React.useState(undefined);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState({
    couponId: 0,
    couponCode: "",
    company: "",
    price: 0,
    description: "",
    validity: 0,
  });

  // Define the columns for the DataGrid
  const columns = [
    {
      field: "couponId",
      headerName: "Coupon ID",
      flex: 1,
    },
    {
      field: "couponCode",
      headerName: "Coupon Code",
      flex: 1,
    },
    { field: "company", headerName: "Company", flex: 1, headerAlign: "center" },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      headerAlign: "center",
    },
    {
      field: "validity",
      headerName: "Validity (Days)",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => handleEditClick(params.row)}
            aria-label="edit"
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(params.row)}
            aria-label="delete"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const openSnackbar = (message, severity, transition) => {
    setSnackbarMessage(message);
    setSnackbarTransition(() => transition);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const handleEditClick = (row) => {
    setSelectedCoupon(row);
    setIsEditModalOpen(true);
  };

  const handleCouponEdit = async (editedCoupon) => {
    try {
      const res = await updateCoupon(editedCoupon, accessToken);
      const updatedCoupons = coupons.map((coupon) =>
        coupon.couponId === res.couponId ? res : coupon
      );
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCoupons(updatedCoupons);
      }, 1000);
      openSnackbar("Coupon Updated Successfully!", "success", TransitionUp);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (row) => {
    // Set the coupon to delete and open the delete dialog
    setCouponToDelete(row);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    // Perform the delete operation using the API
    console.log(couponToDelete);
    try {
      const res = await deleteCouponById(couponToDelete.couponId, accessToken);
      const updatedCoupons = coupons.filter(
        (coupon) => coupon.couponId !== couponToDelete.couponId
      );
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCoupons(updatedCoupons);
      }, 1000);
      openSnackbar(res, "success", TransitionUp);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleAddCouponClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddCoupon = async (newCouponData) => {
    console.log("Adding new coupon:", newCouponData);
    try {
      const res = await addCoupon(newCouponData, accessToken);
      const updatedCoupons = [...coupons, res];
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCoupons(updatedCoupons);
      }, 1000);
      openSnackbar("Coupon Added Successfully!", "success", TransitionUp);
      setIsEditModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 406) {
        // If the error status is 409 (Conflict), it means CouponCode already exists
        openSnackbar("CouponCode already exists!", "error", TransitionUp);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Make an API call to fetch the list of coupons
    const fetchAllCoupons = async () => {
      try {
        const res = await getAllCoupons(accessToken);
        // console.log(res);
        setTimeout(() => {
          setLoading(false);
          setCoupons(res);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllCoupons();
  }, []);

  return (
    <>
      <Paper elevation={3} style={{ padding: "50px", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          All Coupons
        </Typography>
        <p>
          This page displays all available coupons. You can manage and edit them
          below.
        </p>
      </Paper>
      <Container component="main" maxWidth="lg">
        <div
          style={{
            height: "90vh",
            width: "100%",
            padding: "3% 2% 5%",
            marginBottom: "3%",
          }}
        >
          <DataGrid
            getRowId={(row) => row.couponId}
            loading={loading}
            columns={columns}
            rows={coupons}
            pageSize={10} // You can adjust the number of rows per page
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2% 0",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddCouponClick()}
            >
              Add new Coupon
            </Button>
          </div>
        </div>
        <AddCouponDialog
          open={isAddDialogOpen}
          handleClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddCoupon}
        />
        <EditCouponDialog
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          coupon={selectedCoupon}
          onEdit={handleCouponEdit}
        />
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
          <Alert variant="filled" severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            {couponToDelete && (
              <div>
                <p>Are you sure you want to delete this coupon?</p>
                <p>
                  <strong>Coupon ID:</strong> {couponToDelete.couponId}
                </p>
                <p>
                  <strong>Coupon Code:</strong> {couponToDelete.couponCode}
                </p>
                <p>
                  <strong>Company:</strong> {couponToDelete.company}
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
      </Container>
    </>
  );
};

export default ViewAllCoupons;
