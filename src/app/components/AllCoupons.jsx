import React from "react";
import CouponCard from "../common/CouponCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import { getAllCoupons } from "../../api/coupon";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../features/cart";
import CartButton from "../common/CartButton";
import CartDrawer from "../common/CartDrawer";
import axios from "axios";
import couponsImg from "../../assets/couponsImg.jpg";

export default function AllCoupons() {
  const { accessToken } = useSelector((state) => state.auth.value);
  const [allCoupons, setAllCoupons] = React.useState([]);
  const [showCartButton, setShowCartButton] = React.useState(false);
  const cart = useSelector((state) => state.cart.value); // Assuming you have a Redux store for the cart

  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCoupons(accessToken);
        // console.log(res);
        setAllCoupons(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    if (cart.length > 0) {
      setShowCartButton(true);
    } else {
      setShowCartButton(false);
    }
  }, [accessToken, cart]);

  //   const [anchorEl, setAnchorEl] = React.useState(null);

  //   const handleCartOpen = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  const [cartOpen, setCartOpen] = React.useState(false); // State for the cart drawer visibility

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <>
      <Box>
        <Box p={12} textAlign="center">
          <Typography variant="h4" color="text.primary">
            Explore Exclusive Coupons
          </Typography>
          <Typography variant="body1" color="text.primary">
            Discover amazing deals and discounts on a wide range of products and
            services from a wide range of companies.
          </Typography>
        </Box>
      </Box>
      <Container>
        <Grid container spacing={2}>
          {allCoupons?.map((coupon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={coupon.couponId}>
              <CouponCard
                coupId={coupon.couponId}
                price={coupon.price}
                company={coupon.company}
                desc={coupon.description}
                validity={coupon.validity}
                code={coupon.couponCode}
                addToCart={() => dispatch(addToCart(coupon.couponCode))}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {cart.length ? (
        <CartButton
          cart={cart}
          handleCartOpen={handleCartOpen}
          showCartButton={showCartButton}
          //   anchorEl={anchorEl}
          //   handleClose={handleClose}
        />
      ) : null}
      <CartDrawer
        open={cartOpen}
        onClose={handleCartClose} // Close the cart drawer
        cart={cart} // Pass the cart items array
      />
    </>
  );
}
