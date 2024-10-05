import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Define async thunks
export const addToUser = createAsyncThunk(
  "orebi/addToUser",
  async (userData, { rejectWithValue }) => {
    const ExtenddataUser = {
      ...userData,
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    };

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ExtenddataUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data)); // فقط کاربر در localStorage ذخیره می‌شود
      toast.success('The user successfully added!');
      return { status: 'Success', user: data };
    } catch (error) {
      toast.error('There was a problem with the fetch operation');
      return rejectWithValue({ status: 'Failure', message: error.message });
    }
  }
);

export const checkUser = createAsyncThunk(
  "orebi/checkUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const isValidUser = data.find(
        (item) =>
          item.email === userData.email &&
          item.password === userData.password
      );

      if (isValidUser) {
        localStorage.setItem('user', JSON.stringify(isValidUser)); // فقط کاربر در localStorage ذخیره می‌شود
        toast.success('The user successfully signed in!');
        return { user: isValidUser, status: 'Success' };
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      toast.error('There was an error, please try again later.');
      return rejectWithValue({ status: 'Failure', message: error.message });
    }
  }
);

export const loginData = createAsyncThunk(
  "orebi/loginData",
  async ({ email, password }, { rejectWithValue }) => {
    const url = "https://api.escuelajs.co/api/v1/auth/login/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }

      const data = await response.json();
      return data.access_token; // فقط توکن را بازمی‌گرداند
    } catch (error) {
      // toast.error('Login failed!');
      return rejectWithValue({ status: 'Failure', message: error.message });
    }
  }
);

export const updatePromise = createAsyncThunk(
  "orebi/updatePromise",
  async (userData, { rejectWithValue }) => {
    const url = `https://api.escuelajs.co/api/v1/users/${userData.id}`; // فرض بر این است که userData شامل id کاربر است

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }

      const data = await response.json();
      // بروزرسانی userInfo و localStorage
      localStorage.setItem('user', JSON.stringify(data)); // بروزرسانی در localStorage
      toast.success('User information updated successfully!');
      return { user: data, status: 'Success' };
    } catch (error) {
      toast.error('Failed to update user information.');
      return rejectWithValue({ status: 'Failure', message: error.message });
    }
  }
);


// delete user
export const deleteUser = createAsyncThunk(
  "orebi/deleteUser",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      console.log(id)
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // اضافه کردن توکن در هدر
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to delete user");
      }

      return { id, status: 'Success' }; // بازگشت اطلاعات کاربر حذف شده
    } catch (error) {
      return rejectWithValue({ status: 'Failure', message: error.message });
    }
  }
);


const initialState = {
  userInfo: [],
  products: [],
  status: 'idle',
  token: null
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter((item) => item._id !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
    clearUser: (state) => {
      state.userInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToUser.fulfilled, (state, action) => {
        state.userInfo.push(action.payload.user);
        state.status = action.payload.status; 
      })
      .addCase(addToUser.rejected, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.status = action.payload.status;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.status = action.payload.status;
      })
      // Handle login success or failure
      .addCase(loginData.fulfilled, (state, action) => {
        state.token = action.payload; // توکن را به صورت مستقیم ذخیره می‌کند
      })
      .addCase(loginData.rejected, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(updatePromise.fulfilled, (state, action) => {
        // بروزرسانی userInfo با اطلاعات جدید
        state.userInfo = action.payload.user; // بروزرسانی userInfo
        state.status = action.payload.status;
      })
      .addCase(updatePromise.rejected, (state, action) => {
        state.status = action.payload.status;
      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        // حذف کاربر از userInfo
        // state.userInfo = state.userInfo.filter((user) => user.id !== action.payload.id);
        state.status = action.payload.status;
        toast.success(`User with ID ${action.payload.id} was successfully deleted.`);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = action.payload.status;
        toast.error(action.payload.message || "Failed to delete user.");
      });
  },
  
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  clearUser,
} = orebiSlice.actions;

export default orebiSlice.reducer;

