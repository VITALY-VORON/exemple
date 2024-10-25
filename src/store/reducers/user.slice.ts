import { authService } from "@/api/services/auth/auth.service";
import { TLoginUser, TRegisterUser } from "@/schemas/Auth.schema";
import { TUser } from "@/schemas/User.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface UserState {
  user: TUser;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: {
    id: "",
    email: "",
    name: "",
    avatarUrl: "",
    role: UserRole.USER,
  },
  isLoading: false,
  error: null,
};

export const fetchUserDataLogin = createAsyncThunk(
  "user/login",
  async (data: TLoginUser, { rejectWithValue }) => {
    try {
      const res = await authService.main("login", data);
      return res.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const fetchUserDataRegister = createAsyncThunk(
  "user/register",
  async (data: TRegisterUser, { rejectWithValue }) => {
    try {
      const res = await authService.main("register", data);
      return res.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: TUser }) => {
      state.user = action.payload;
    },
    clearUser: () => initialState,
    updateUser: (state, action: { payload: Partial<TUser> }) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDataLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDataLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserDataRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDataRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDataRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.user.isLoading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
