import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  is_connected: null,
}

export const is_connected_slice = createSlice({
  name: 'is_connected',
  initialState,
  reducers: {
    set_is_connected: (state, action) => {
      state.is_connected = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_is_connected } = is_connected_slice.actions

export default is_connected_slice.reducer

  
  