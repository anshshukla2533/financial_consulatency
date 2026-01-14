import { createSlice } from '@reduxjs/toolkit';

const caSlice = createSlice({
  name: 'ca',
  initialState: {
    cas: [],
    currentCA: null,
  },
  reducers: {
    setCAs: (state, action) => {
      state.cas = action.payload;
    },
    setCurrentCA: (state, action) => {
      state.currentCA = action.payload;
    },
  },
});

export const { setCAs, setCurrentCA } = caSlice.actions;
export default caSlice.reducer;