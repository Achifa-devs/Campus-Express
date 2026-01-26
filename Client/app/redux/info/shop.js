import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shop: null,
}

export const shop_slice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    set_shop: (state, action) => {
      state.shop = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_shop } = shop_slice.actions

export default shop_slice.reducer

  
  