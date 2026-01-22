import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Cart: [],
  }
  
  export const CartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
      
      setCartTo: (state, action) => {
        state.Cart = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setCartTo } = CartSlice.actions
  
  export default CartSlice.reducer

  
  