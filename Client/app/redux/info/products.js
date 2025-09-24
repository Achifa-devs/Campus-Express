import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  products: [],
}

export const products_slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    set_products: (state, action) => {
      state.products = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_products } = products_slice.actions

export default products_slice.reducer

  
  