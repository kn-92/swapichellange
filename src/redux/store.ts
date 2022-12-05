import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./peopleSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
