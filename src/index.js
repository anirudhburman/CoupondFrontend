import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import { Provider, useSelector } from "react-redux";
import configureStore from "./store/configureAppStore";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";

const store = configureStore();

const root = createRoot(document.getElementById("root"));

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#57e0d7",
    },
    secondary: {
      main: "#43cbc2",
    },
    background: {
      default: "#fbfefe",
    },
    text: {
      primary: "#232929",
      secondary: "#6a7c7b",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  overrides: {
    MuiChip: {
      variants: [
        {
          props: { variant: "plain" },
          style: {
            // Define the styles for the "soft" variant here
          },
        },
      ],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#57e0d7",
    },
    secondary: {
      main: "#43cbc2",
    },
    background: {
      default: "#162726",
      paper: "#1d3533",
    },
    text: {
      primary: "#f1f3f3",
      secondary: "#bac4c4",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

const RootComponent = () => {
  // Access global state and dispatch actions in this component
  const isDarkTheme = useSelector((state) => state.isDarkTheme.value);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* <StyledEngineProvider injectFirst> */}
      {/* <CssVarsProvider> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
      {/* </CssVarsProvider> */}
      {/* </StyledEngineProvider> */}
    </ThemeProvider>
  );
};

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
};

// const renderApp = () =>
//   root.render(
//     <ThemeProvider theme={isDarkTheme}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </ThemeProvider>
//   );

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./app/App", renderApp);
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
