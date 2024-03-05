import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    email: "",
    profilePic: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.profile.email = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profile.profilePic = action.payload;
    },
  },
});

export const { setEmail, setProfilePic } = userSlice.actions;

export default userSlice.reducer;
