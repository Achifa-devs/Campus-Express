import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deal: null,
}

export const deal_slice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    set_deal: (state, action) => {
      state.deal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_deal } = deal_slice.actions

export default deal_slice.reducer

  
  