import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for category-related API requests
const BASE_URL = "http://localhost:8000/categories";

// Async thunk for fetching all categories
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  }
);

// Async thunk for adding a new category
export const addCategory = createAsyncThunk(
  "categories/add",
  async (categoryData) => {
    const response = await axios.post(`${BASE_URL}/`, categoryData);
    return response.data;
  }
);

// Async thunk for updating an existing category
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, updateData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updateData);
    return response.data;
  }
);

// Async thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

// Initial state of the categories slice
const initialState = {
  categories: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Category slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
