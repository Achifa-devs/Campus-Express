import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    seller_id: null,
  }
  
  export const SellerIdSlice = createSlice({
    name: 'seller_id',
    initialState,
    reducers: {
      setSellerIdTo: (state, action) => {
        state.seller_id = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSellerIdTo } = SellerIdSlice.actions
  
  export default SellerIdSlice.reducer

  
  