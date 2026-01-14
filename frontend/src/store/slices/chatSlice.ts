import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    rooms: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { setMessages, addMessage, setRooms } = chatSlice.actions;
export default chatSlice.reducer;