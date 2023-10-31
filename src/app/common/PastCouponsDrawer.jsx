import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";

const drawerStyle = {
  display: "flex",
  flexDirection: "column",
  width: 300,
  height: "100%",
  padding: "16px",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const centerContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};

export default function PastCouponsDrawer({ open, onClose, list }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={drawerStyle}>
        <Typography variant="h6" gutterBottom>
          Previously bought Coupons
        </Typography>
        {list.length === 0 ? (
          <div style={centerContentStyle}>
            <List>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  You haven't bought any Coupons yet. Don't like saving money?
                  Buy some now!
                </Typography>
                <br />
                <Button
                  component={RouterLink}
                  to="/browseAllCoupons"
                  variant="contained"
                  style={{ boxShadow: "none", padding: 8 }}
                >
                  Browse Coupons
                </Button>
              </Box>
            </List>
          </div>
        ) : (
          <div style={{ justifyContent: "flex-start" }}>
            <List>
              {list?.map((coupon) => (
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
                          <Typography variant="body2" color="text.secondary">
                            <strong>Code: {coupon.couponCode}</strong>
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1" color="text.primary">
                            ₹{coupon.price}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        )}
      </div>
    </Drawer>
  );
}
