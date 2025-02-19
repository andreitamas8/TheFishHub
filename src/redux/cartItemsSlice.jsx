import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:3000/api";
const localCart = localStorage.getItem("cart");
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

// Async thunk to update the backend cart
export const updateBackendCart = createAsyncThunk(
  "cartItems/updateBackendCart",
  async ({ cart, userId, token }, { rejectWithValue }) => {
    if (!userId) return cart; // If user is not authenticated, skip backend update

    try {
      const response = await fetch(
        `${API_BASE_URL}/accounts/${userId}/preferences`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ cart: cart }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.preferences.cart; // Ensure only the cart array is returned
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const fetchBackendCart = createAsyncThunk(
  "cartItems/fetchBackendCart", // Action type
  async ({ userId, token }, { rejectWithValue }) => {
    // Payload creator (async function)
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/${userId}/cart`, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result; // This should be the cart data (an array or object as per backend)
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);
const initialState = localCart ? JSON.parse(localCart) : [];
const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },

    addItemToCart: (state, action) => {
      const { id, selectedGender } = action.payload;
      const existingItem = state.find(
        (item) => item.id === id && item.selectedGender === selectedGender
      );

      if (existingItem) {
        // If the item already exists in the cart, increment the quantity
        existingItem.quantity += action.payload.quantity || 1; // Default to 1 if undefined
      } else {
        // If it's a new item, add it with the quantity set to 1 if undefined
        state.push({
          ...action.payload,
          quantity: action.payload.quantity || 1, // Default to 1 if quantity is undefined
          selectedGender,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state)); // Update localStorage after modifying state
    },

    removeItemFromCart: (state, action) => {
      const updatedCart = state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with 0 quantity
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart; // Return the updated cart to update the state
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBackendCart.fulfilled, (state, action) => {
        if (!action.payload) return state; // If backend returns nothing, keep existing state

        const backendCart = action.payload;
        const mergedCart = [...state];

        backendCart.forEach((backendItem) => {
          const existingItem = mergedCart.find(
            (item) => item.id === backendItem.id
          );
          if (existingItem) {
            existingItem.quantity = Math.max(
              existingItem.quantity,
              backendItem.quantity
            );
          } else {
            mergedCart.push(backendItem);
          }
        });
        localStorage.setItem("cart", JSON.stringify(mergedCart));
        return mergedCart;
      })
      .addCase(fetchBackendCart.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});
export const hasSpecificAnimals = (state) => {
  const targetCategories = [
    "Fish",
    "Invertebrate",
    "Iguana",
    "Tarantula",
    "Scorpions",
    "Geko",
    "Turtles",
    "Chameleons",
    "Snakes",
    "Frogs",
    "Insects",
    "Other Animals",
  ];

  return state.some((item) => {
    const nameOnly = item.name.replace(/\d+/g, "").trim();
    return targetCategories.includes(nameOnly); // RETURN is missing in your original code
  });
};
export const selectTotalPrice = (state) => {
  return state.cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace("$", "")); // Assuming price is a string like "$10.00"
    return total + price * item.quantity;
  }, 0);
};

export const selectTotalDiscountedPrice = (state) => {
  return state.cartItems
    .reduce((total, item) => {
      const discountedPrice =
        Number(item.discountedPrice.replace("$", "")) || 0;
      const quantity = item.quantity || 1;
      return total + discountedPrice * quantity;
    }, 0)
    .toFixed(2);
};

export const selectTotalQuantity = (state) => {
  // Check if cartItems is indeed an array
  const cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];

  if (cartItems.length > 0) {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  } else {
    return 0;
  }
};

export const {
  setCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
