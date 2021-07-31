import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
  },

  reducers: {
    setChannel: (state, action) => {
      state.channelId = action.payload.channelId;
    },
  },
});

export const { setChannel } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;

export default appSlice.reducer;
