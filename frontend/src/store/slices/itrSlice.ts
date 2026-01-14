import { createSlice } from '@reduxjs/toolkit';

const itrSlice = createSlice({
  name: 'itr',
  initialState: {
    itrs: [],
    currentITR: null,
  },
  reducers: {
    setITRs: (state, action) => {
      state.itrs = action.payload;
    },
    setCurrentITR: (state, action) => {
      state.currentITR = action.payload;
    },
  },
});

export const { setITRs, setCurrentITR } = itrSlice.actions;
export default itrSlice.reducer;