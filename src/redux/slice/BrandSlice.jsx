import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../../Hook/useGetData";
export const getBrnads = createAsyncThunk(
  "brands/getBrands",
  async (limit, thunkAPI) => {
    try {
      const res = await useGetData(`/api/v1/brands?limit=${limit}`);
      return res;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const getBrnadsPagination = createAsyncThunk(
  "brands/getBrandsPagination",
  async (page, thunkAPI) => {
    try {
      const res = await useGetData(`/api/v1/brands?limit=8&page=${page}`);
      return res;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const initialState = { brands: [], isLoading: false, erro: null };
const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: {
    [getBrnads.pending]: (state) => {
      state.isLoading = true;
      state.erro = null;
    },
    [getBrnads.fulfilled]: (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
    },
    [getBrnads.rejected]: (state, action) => {
      state.erro = action?.payload;
      state.isLoading = false;
    },
    [getBrnadsPagination.pending]: (state) => {
      state.isLoading = true;
      state.erro = null;
    },
    [getBrnadsPagination.fulfilled]: (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
    },
    [getBrnadsPagination.rejected]: (state, action) => {
      state.erro = action?.payload;
      state.isLoading = false;
    },
  },
});

export default brandSlice.reducer;
