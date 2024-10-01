import { fetchToken, login, register } from "@api/userApi";
import { LoginType } from "@models/login";
import { RegisterType } from "@models/register";
import { TokenType } from "@models/token";
import { UserType } from "@models/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getToken = createAsyncThunk(
  "user/getToken",
  async ({ email, password }: LoginType) => {
    const response = await fetchToken({ email, password });
    return response;
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ email, password }: LoginType) => {
    const response = await login({ email, password });
    return response;
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, password, username }: RegisterType) => {
    const response = await register({ email, password, username });
    return response;
  }
);

type UserStateType = {
  user: UserType | null;
  tokens: TokenType | null;
};

const initialState: UserStateType = {
  user: null,
  tokens: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        console.error("Ошибка входа:", action.error.message);
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.error("Ошибка регистрации:", action.error.message);
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.tokens = action.payload;
      })
      .addCase(getToken.rejected, (state, action) => {
        console.error("Ошибка получения токена:", action.error.message);
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
