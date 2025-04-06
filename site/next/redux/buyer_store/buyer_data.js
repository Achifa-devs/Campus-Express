import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    buyer_id: null,
  }
  
  export const BuyerIdSlice = createSlice({
    name: 'buyer_id',
    initialState,
    reducers: {
      setBuyerIdTo: (state, action) => {
        state.buyer_id = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setBuyerIdTo } = BuyerIdSlice.actions
  
  export default BuyerIdSlice.reducer

  
  