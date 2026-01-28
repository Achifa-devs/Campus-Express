import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  option: 'Products',
}

export const option_slice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    set_option: (state, action) => {
      state.option = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_option } = option_slice.actions

export default option_slice.reducer

  
  