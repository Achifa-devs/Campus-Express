import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ads_modal: {data: 0, visible: 0},
}

export const ads_modal_slice = createSlice({
  name: 'ads_modal',
  initialState,
  reducers: {
    set_ads_modal: (state, action) => {
      state.ads_modal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_ads_modal } = ads_modal_slice.actions

export default ads_modal_slice.reducer

  
  