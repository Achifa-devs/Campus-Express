import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  is_active: {},
}

export const is_active_slice = createSlice({
  name: 'is_active',
  initialState,
  reducers: {
    set_is_active: (state, action) => {
      state.is_active = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_is_active } = is_active_slice.actions

export default is_active_slice.reducer

  
  