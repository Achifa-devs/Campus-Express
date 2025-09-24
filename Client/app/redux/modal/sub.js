import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sub_modal: 0,
}

export const sub_modal_slice = createSlice({
  name: 'sub_modal',
  initialState,
  reducers: {
    set_sub_modal: (state, action) => {
      state.sub_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_sub_modal } = sub_modal_slice.actions

export default sub_modal_slice.reducer

  
  