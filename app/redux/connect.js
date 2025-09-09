import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  connect_modal: 0,
}

export const connect_modal_slice = createSlice({
  name: 'connect_modal',
  initialState,
  reducers: {
    set_connect_modal: (state, action) => {
      state.connect_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_connect_modal } = connect_modal_slice.actions

export default connect_modal_slice.reducer

  
  