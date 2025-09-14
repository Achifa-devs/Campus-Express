import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sponsored_modal: {data: null, visible: 1},
}

export const sponsored_modal_slice = createSlice({
  name: 'sponsored_modal',
  initialState,
  reducers: {
    set_sponsored_modal: (state, action) => {
      state.sponsored_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_sponsored_modal } = sponsored_modal_slice.actions

export default sponsored_modal_slice.reducer

  
  