import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  payment_method: 'card', 
}

export const payment_method_slice = createSlice({
  name: 'payment_method',
  initialState,
  reducers: {
    set_payment_method: (state, action) => {
      state.payment_method = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_payment_method } = payment_method_slice.actions

export default payment_method_slice.reducer

  
  