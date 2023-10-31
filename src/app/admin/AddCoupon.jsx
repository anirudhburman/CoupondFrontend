import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function AddCouponDialog({ open, handleClose, onAdd }) {
  const { handleSubmit, control, formState, setError } = useForm();

  const handleAddCoupon = (data) => {
    if (data.price <= 0) {
      setError("price", { type: "manual", message: "Price must be positive" });
      return;
    }

    if (data.validity <= 0) {
      setError("validity", {
        type: "manual",
        message: "Validity must be positive",
      });
      return;
    }

    onAdd(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Coupon</DialogTitle>
      <form onSubmit={handleSubmit(handleAddCoupon)}>
        <DialogContent>
          <Controller
            name="couponCode"
            control={control}
            defaultValue=""
            rules={{ required: "Coupon Code is required" }}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Coupon Code"
                {...field}
                error={!!formState.errors.couponCode}
                helperText={
                  formState.errors.couponCode &&
                  formState.errors.couponCode.message
                }
              />
            )}
          />
          <Controller
            name="company"
            control={control}
            defaultValue=""
            rules={{ required: "Company is required" }}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Company"
                {...field}
                error={!!formState.errors.company}
                helperText={
                  formState.errors.company && formState.errors.company.message
                }
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{
              required: "Price is required",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Price must be a positive number",
              },
            }}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Price"
                {...field}
                type="number"
                error={!!formState.errors.price}
                helperText={
                  formState.errors.price && formState.errors.price.message
                }
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Description"
                {...field}
                error={!!formState.errors.description}
                helperText={
                  formState.errors.description &&
                  formState.errors.description.message
                }
              />
            )}
          />
          <Controller
            name="validity"
            control={control}
            defaultValue=""
            rules={{
              required: "Validity is required",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Validity must be a positive number",
              },
            }}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Validity"
                {...field}
                type="number"
                error={!!formState.errors.validity}
                helperText={
                  formState.errors.validity && formState.errors.validity.message
                }
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Coupon
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddCouponDialog;
