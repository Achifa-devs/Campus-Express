import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: false,
}

export const location_slice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    set_location: (state, action) => {
      state.location = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_location } = location_slice.actions

export default location_slice.reducer

  
  