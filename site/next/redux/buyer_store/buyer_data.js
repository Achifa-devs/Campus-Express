import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: null,
  }
  
  export const BuyerIdSlice = createSlice({
    name: 'user_id',
    initialState,
    reducers: {
      setBuyerIdTo: (state, action) => {
        state.user_id = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setBuyerIdTo } = BuyerIdSlice.actions
  
  export default BuyerIdSlice.reducer

  
  