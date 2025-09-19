import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unread: 0,
}

export const unread_slice = createSlice({
  name: 'unread',
  initialState,
  reducers: {
    set_unread: (state, action) => {
      state.unread = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_unread } = unread_slice.actions

export default unread_slice.reducer

  
  