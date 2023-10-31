import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

function EditCouponDialog({ open, handleClose, coupon, onEdit }) {
  const { handleSubmit, control, formState, reset, setError } = useForm();

  const handleEdit = (data) => {
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
    onEdit(data);
    handleClose();
  };

  React.useEffect(() => {
    reset(coupon);
  }, [coupon, reset]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Coupon</DialogTitle>
      <form onSubmit={handleSubmit(handleEdit)}>
        <DialogContent>
          <Controller
            name="couponId"
            control={control}
            defaultValue={coupon.couponId}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Coupon ID"
                {...field}
                disabled
                style={{ margin: "0.5em 0" }}
              />
            )}
          />
          <Controller
            name="couponCode"
            control={control}
            defaultValue={coupon.couponCode}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Coupon Code"
                {...field}
                error={!!formState.errors.couponCode}
                helperText={
                  formState.errors.couponCode && "Coupon Code is required"
                }
              />
            )}
          />
          <Controller
            name="company"
            control={control}
            defaultValue={coupon.company}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Company"
                {...field}
                error={!!formState.errors.company}
                helperText={formState.errors.company && "Company is required"}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            defaultValue={coupon.price}
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
            defaultValue={coupon.description}
            render={({ field }) => (
              <TextField
                style={{ margin: "0.5em 0" }}
                fullWidth
                label="Description"
                {...field}
                error={!!formState.errors.description}
                helperText={
                  formState.errors.description && "Description is required"
                }
              />
            )}
          />
          <Controller
            name="validity"
            control={control}
            defaultValue={coupon.validity}
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
            Update Coupon
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditCouponDialog;
