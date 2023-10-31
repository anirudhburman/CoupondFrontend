import React from "react";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { Grow } from "@mui/material";

function CartButton({ cart, handleCartOpen, showCartButton }) {
  return (
    <>
      <Grow in={showCartButton}>
        <Fab
          color="primary"
          aria-label="open cart"
          onClick={handleCartOpen}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </Grow>
    </>
  );
}

export default CartButton;
