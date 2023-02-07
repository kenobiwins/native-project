import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      login: action.payload.login,
      email: action.payload.email,
    }),
    authStateChange: (state, action) => ({
      ...state,
      stateChange: action.payload,
    }),
    authSignOut: () => initialState,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
