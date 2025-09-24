import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chat: [],
}

export const chat_slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    set_chat: (state, action) => {
      state.chat = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_chat } = chat_slice.actions

export default chat_slice.reducer

  
  