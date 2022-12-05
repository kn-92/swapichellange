import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import axios from "axios";

interface Data {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

interface PeopleState {
  loading: boolean;
  error: null | string;
  data: Data[];
  number: number;
}
interface State {
  people: PeopleState;
}

const initialState: PeopleState = {
  loading: false,
  error: null,
  data: [],
  number: 1,
};

export const getPerson = createAsyncThunk(
  "swapi/people",
  async (data, thunkApi) => {
    const state = thunkApi.getState() as State;
    try {
      const response = await axios.get<Data>(
        `https://swapi.py4e.com/api/people/${state.people.number}/`
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    numberIncrement: (state) => {
      state.number += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPerson.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPerson.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(getPerson.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectPeople = (state: RootState) => state.people.data;
export const { numberIncrement } = peopleSlice.actions;

export default peopleSlice.reducer;
