import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    buyerJsx: null,
  }
  
  export const buyerJsxSlice = createSlice({
    name: 'buyerJsx',
    initialState,
    reducers: {
      
      setBuyerJsxTo: (state, action) => {
        state.buyerJsx = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setBuyerJsxTo } = buyerJsxSlice.actions
  
  export default buyerJsxSlice.reducer

  
  