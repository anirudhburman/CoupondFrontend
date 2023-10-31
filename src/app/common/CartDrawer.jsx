import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import { IconButton } from "@mui/material";
import { clearCart, removeFromCart } from "../../features/cart";
import {
  clearCodesFromCart,
  removeCodeFromCart,
} from "../../features/cartCodes";
import axios from "axios";
import couponsImg from "../../assets/couponsImg.jpg";
import { useNavigate } from "react-router-dom";
import { buyCoupon } from "../../api/user";

const drawerStyle = {
  display: "flex",
  flexDirection: "column",
  width: 300,
  height: "100%",
  padding: "16px",
  justifyContent: "space-between",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function CartDrawer({ open, onClose, cart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, username } = useSelector((state) => state.auth.value);
  const listOFCouponCodes = useSelector((state) => state.cartCodes.value);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const newTotalPrice = cart.reduce((total, item) => total + item.price, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const handleRemoveFromCart = (couponId, code) => {
    dispatch(removeFromCart(couponId));
    dispatch(removeCodeFromCart(code));
  };

  const paymentStart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9980/payment/create_order/" + totalPrice
      );
      console.log(response.data);
      openTransactionModal(response.data);
    } catch (error) {
      alert(error);
    }
  };

  function openTransactionModal(response) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: "Coupond",
      description: "Payment for selected Coupons",
      image: { couponsImg },
      handler: (res) => {
        processResponse(res);
      },
      prefill: {
        name: "Coupond",
        email: "coupond@gmail.com",
        contact: "9464782992",
      },
      notes: {
        address: "Purchase Coupons",
      },
      theme: {
        color: "#57e0d7",
      },
    };

    var razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  function processResponse(resp) {
    console.log(resp);
    if (resp) {
      const buy = async (token, username, coupons) => {
        const res = await buyCoupon(username, coupons, token);
        console.log(res);
      };
      buy(accessToken, username, listOFCouponCodes);
      dispatch(clearCart());
      dispatch(clearCodesFromCart());
      navigate("/profile");
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={drawerStyle}>
        <div>
          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>
          <List>
            {cart.map((coupon) => (
              <div key={coupon.couponId}>
                <Card>
                  <CardContent>
                    <div style={itemStyle}>
                      <div>
                        <Typography variant="subtitle1">
                          {coupon.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {coupon.description}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle1" color="text.primary">
                          ₹{coupon.price}
                        </Typography>
                        <IconButton>
                          <DeleteIcon
                            color="error"
                            onClick={() =>
                              handleRemoveFromCart(
                                coupon.couponId,
                                coupon.couponCode
                              )
                            }
                          />
                        </IconButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Divider />
              </div>
            ))}
          </List>
        </div>
        <div>
          <Divider />
          <Typography variant="h6">Total: ₹{totalPrice}</Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 10, marginBottom: 10 }}
            onClick={() => {
              // Handle the Pay Now button click
              paymentStart();
            }}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
