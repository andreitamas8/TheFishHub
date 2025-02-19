import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_BASE_URL = "http://localhost:3000/api";

export const updateBackendPersonalData = createAsyncThunk(
  "user/updateBackendPersonalData",
  async ({ data, userId, token }, { rejectWithValue }) => {
    if (!userId) return data; // If user is not authenticated, skip backend update

    try {
      const response = await fetch(
        `${API_BASE_URL}/accounts/${userId}/personalData`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ data: data }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.personalData.data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const fetchBackendPersonalData = createAsyncThunk(
  "user/fetchBackendPersonalData", // Action type
  async ({ userId, token }, { rejectWithValue }) => {
    // Payload creator (async function)
    try {
      const response = await fetch(
        `${API_BASE_URL}/accounts/${userId}/personalData`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data; // This should be the cart data (an array or object as per backend)
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);
const initialState = {
  userId: null,
  name: "",
  email: "",
  preferences: { theme: "light", language: "en" },
  personalData: {},
  isAuthenticated: false,
  isPersonalDataSet: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.preferences = action.payload.preferences;
      state.isAuthenticated = true;
    },
    userPersonalData: (state, action) => {
      state.personalData = action.payload.personalData;
      state.isPersonalDataSet = true;
    },
    setPersonalDataTrue: (state, action) => {
      state.isPersonalDataSet = true;
    },
    setPersonalDataFalse: (state, action) => {
      state.isPersonalDataSet = false;
    },
    resetPersonalData: (state, action) => {
      state.personalData = {};
      state.isPersonalDataSet = false;
    },
    logout: (state) => {
      return initialState; // Reset user state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBackendPersonalData.fulfilled, (state, action) => {
        if (action.payload) {
          state.personalData = action.payload; // Update only personalData
        }
      })
      .addCase(fetchBackendPersonalData.fulfilled, (state, action) => {
        if (action.payload) {
          state.personalData = action.payload; // Update only personalData
        }
      })
      .addCase(updateBackendPersonalData.rejected, (state, action) => {
        console.error("Error updating personal data:", action.payload);
      })
      .addCase(fetchBackendPersonalData.rejected, (state, action) => {
        console.error("Error fetching personal data:", action.payload);
      });
  },
});

export const {
  login,
  userPersonalData,
  resetPersonalData,
  logout,
  setPersonalDataFalse,
  setPersonalDataTrue,
} = userSlice.actions;
export default userSlice.reducer;
