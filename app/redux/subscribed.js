import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  subscribed: true,
}

export const subscribed_slice = createSlice({
  name: 'subscribed',
  initialState,
  reducers: {
    set_subscribed: (state, action) => {
      state.subscribed = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_subscribed } = subscribed_slice.actions

export default subscribed_slice.reducer

  
  