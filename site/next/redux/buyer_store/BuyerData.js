import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    buyerData: null,
  }
  
  export const BuyerSlice = createSlice({
    name: 'buyerData',
    initialState,
    reducers: {
      setBuyerTo: (state, action) => {
        state.buyerData = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setBuyerTo } = BuyerSlice.actions
  
  export default BuyerSlice.reducer

  
  