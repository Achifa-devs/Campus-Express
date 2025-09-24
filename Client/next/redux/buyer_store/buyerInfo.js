import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    buyer_info: null,
  }
  
  export const BuyerInfoSlice = createSlice({
    name: 'buyer_info',
    initialState,
    reducers: {
      setBuyerInfoTo: (state, action) => {
        state.buyer_info = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setBuyerInfoTo } = BuyerInfoSlice.actions
  
  export default BuyerInfoSlice.reducer

  
  