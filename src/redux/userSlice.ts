import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

type STAR_WARS_DATA = {
  name: String;
  created: Date;
  vehicles: String[];
};
type UserRegisterData = {
  login: String;
  password: String;
  email: String;
  number: String;
  checked: Boolean;
};

type PayloadData = {
  data: {
    starWarsData: STAR_WARS_DATA[];
    userRegisterData: UserRegisterData;
  };
};

export const postRegister = createAsyncThunk(
  "example/register",
  async (data: PayloadData, thunkApi) => {
    console.log(data);
    try {
      const response = await axios.post(`https://example/`, data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postRegister.fulfilled, (state, action) => {})
      .addCase(postRegister.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
