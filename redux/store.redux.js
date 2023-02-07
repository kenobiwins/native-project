import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducer.redux";

// const rootReducer = combineReducers({
//   [authSlice.name]: authSlice.reducer,
// });

export const store = configureStore({
  reducer: { auth: authReducer },
});
