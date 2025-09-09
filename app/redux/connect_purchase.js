import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  connect_purchase_modal: 0,
}

export const connect_purchase_modal_slice = createSlice({
  name: 'connect_purchase_modal',
  initialState,
  reducers: {
    set_connect_purchase_modal: (state, action) => {
      state.connect_purchase_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_connect_purchase_modal } = connect_purchase_modal_slice.actions

export default connect_purchase_modal_slice.reducer

  
  