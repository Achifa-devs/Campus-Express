import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locale_modal: 0,
}

export const locale_modal_slice = createSlice({
  name: 'locale_modal',
  initialState,
  reducers: {
    set_locale_modal: (state, action) => {
      state.locale_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_locale_modal } = locale_modal_slice.actions

export default locale_modal_slice.reducer

  
  