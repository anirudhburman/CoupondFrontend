// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Button, CardActions, Chip } from "@mui/material";
// import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

// function CouponCard(props) {
//   return (
//     <Card sx={{ maxWidth: 300 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image="/static/images/cards/contemplative-reptile.jpg"
//         alt="logo"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {props.company}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {props.desc}
//         </Typography>
//         <Typography variant="h6" sx={{ mt: 1 }}>
//           ₹ {props.price}
//           <Chip
//             size="small"
//             color="success"
//             label="Lowest price"
//             sx={{ ml: 1 }}
//           />
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           size="small"
//           color="error"
//           variant="contained"
//           fullWidth // To make the button span the entire width
//         >
//           Get Coupon
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

// export default CouponCard;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Alert, Button, CardActions, Chip, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart";
import { addCodeToCart } from "../../features/cartCodes";

/* prettier-ignore */
const companyLogos = {
  "Amazon": "https://cdn.dribbble.com/users/1923171/screenshots/12213742/media/674c8a81903aa6b424903f7702f078f9.gif",
  "Baskin Robbins":
    "https://media.giphy.com/media/AoIeMSgKDT9FCLJgyr/giphy.gif",
  "Dominos": "https://media.giphy.com/media/3ohhwixvJDUKLCcH72/giphy.gif",
  "Puma": "https://cdn.dribbble.com/users/1731289/screenshots/5917420/media/5d3247d95a961e5256b35de2144977ea.gif",
  "PizzaHut": "https://media.tenor.com/v8M8k6MnA1IAAAAd/pizza-hut-pizza.gif",
  "McDonald's": "https://media0.giphy.com/media/L6coiWj8ENrVe/giphy.gif",
  "Flipkart": "https://cdn.dribbble.com/users/1980856/screenshots/4760116/media/5021b87fb97e90b8f153a4480ffc615e.gif",
  "Myntra": "https://media3.giphy.com/media/UN4vayjHK628KtBAft/200w.webp",
  "defaultLogo":"https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/09/d101d54c-13c5-4758-9358-da3c789a571c.gif?auto=format&q=60&fit=max&w=930",
  // Add more companies and their logo URLs here
};

const defaultLogo =
  "https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/09/d101d54c-13c5-4758-9358-da3c789a571c.gif?auto=format&q=60&fit=max&w=930";

function CouponCard(props) {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const logoUrl = companyLogos[props.company] || companyLogos["defaultLogo"];
  const isItDarkMode = useSelector((state) => state.isDarkTheme.value);
  const coupon = {
    couponId: props.coupId,
    couponCode: props.code,
    company: props.company,
    price: props.price,
    description: props.desc,
    validity: props.validity,
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 300 }}
        style={{ backgroundColor: isItDarkMode ? null : "#E7E9EB" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={logoUrl}
          alt={props.company} // Use the company name as the alt text
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.desc}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Validity: {props.validity} days
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            ₹ {props.price}
            <Chip
              size="small"
              color="success"
              label="Lowest price"
              sx={{ ml: 1 }}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            fullWidth
            onClick={() => {
              dispatch(addCodeToCart(props.code));
              dispatch(addToCart(coupon));
              handleSnackbarOpen();
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success" // You can customize the severity (success, error, warning, info)
        >
          Coupon added to cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CouponCard;
