import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: null,
  }
  
  export const SellerIdSlice = createSlice({
    name: 'user_id',
    initialState,
    reducers: {
      setSellerIdTo: (state, action) => {
        state.user_id = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSellerIdTo } = SellerIdSlice.actions
  
  export default SellerIdSlice.reducer

  
  