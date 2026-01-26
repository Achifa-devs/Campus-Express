import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  boost_modal: {data: null, visible: 0},
}

export const boost_modal_slice = createSlice({
  name: 'boost_modal',
  initialState,
  reducers: {
    set_boost_modal: (state, action) => {
      state.boost_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_boost_modal } = boost_modal_slice.actions

export default boost_modal_slice.reducer

  
  