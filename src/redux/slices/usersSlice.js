import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showMessage, showSuccess } from "assets/handleManyThings";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
    users: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(addUserThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = "idle";
        showSuccess("Đăng kí");
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.error = action.error;
        showError("Đăng kí");
      })
      .addCase(signInThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});
export const fetchUsersThunk = createAsyncThunk(
  "user/fetchUsersThunk",
  async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const addUserThunk = createAsyncThunk(
  "users/addUserThunk",

  async (user) => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const signInThunk = createAsyncThunk(
  "users/signInThunk",
  async (user) => {
    try {
      const res = await fetch(
        `http://localhost:3000/users?phone=${user.phone}&pass=${user.pass}`
      );
      let data = await res.json();

      if (data.length > 0) {
        const dataRes = {
          token: "https://app-json-demo.herokuapp.com/api/login",
          user: data[0],
        };
        console.log(dataRes);
        const fetchToken = async (url) => {
          try {
            const res = await fetch(url);
            const token = await res.json();
            localStorage.setItem("user", JSON.stringify(dataRes));
          } catch (error) {}
        };
        await fetchToken(dataRes.token);
        return dataRes;
      } else {
        localStorage.removeItem("user");
        return data;
      }
    } catch (error) {}
  }
);
export default usersSlice;
