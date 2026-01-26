import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deals: [],
}

export const deals_slice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    set_deals: (state, action) => {
      state.deals = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_deals } = deals_slice.actions

export default deals_slice.reducer

  
  