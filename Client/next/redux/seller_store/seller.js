import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sellerData: null,
  }
  
  export const SellerSlice = createSlice({
    name: 'sellerData',
    initialState,
    reducers: {
      setSellerTo: (state, action) => {
        state.sellerData = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSellerTo } = SellerSlice.actions
  
  export default SellerSlice.reducer

  
  