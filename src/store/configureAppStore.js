import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import monitorReducersEnhancer from "./enhancers/monitorReducers";
import loggerMiddleware from "./middleware/logger";
import usersReducer from "../features/users";
import authReducer from "../features/auth";
import darkThemeReducer from "../features/isDarkTheme";
import cartReducer from "../features/cart";
import cartCodesReducer from "../features/cartCodes";

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    isDarkTheme: darkThemeReducer,
    cart: cartReducer,
    cartCodes: cartCodesReducer,
    // Add your additional reducer here
  });

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = compose(...enhancers);

  // Load the entire state from localStorage with error handling
  let storedState;
  try {
    storedState = localStorage.getItem("appState");
    storedState = storedState ? JSON.parse(storedState) : preloadedState;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    // Handle the error, or use the preloaded state as a fallback
    storedState = preloadedState;
  }

  const store = createStore(rootReducer, storedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("../features/users", () =>
      store.replaceReducer(usersReducer)
    );
  }

  // Save the state to localStorage whenever it changes
  store.subscribe(() => {
    try {
      localStorage.setItem("appState", JSON.stringify(store.getState()));
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
      // Handle the error, or continue without saving the state
    }
  });

  return store;
}
