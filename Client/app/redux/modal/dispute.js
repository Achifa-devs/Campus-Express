import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dispute_modal: {visible: 0, data: null},
}

export const dispute_modal_slice = createSlice({
  name: 'dispute_modal',
  initialState,
  reducers: {
    set_dispute_modal: (state, action) => {
      state.dispute_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_dispute_modal } = dispute_modal_slice.actions

export default dispute_modal_slice.reducer

  
  