import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: null,
}

export const mode_slice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    set_mode: (state, action) => {
      state.mode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_mode } = mode_slice.actions

export default mode_slice.reducer

  
  