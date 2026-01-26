import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    partner: null,
  }
  
  export const partner_slice = createSlice({
    name: 'partner',
    initialState,
    reducers: {
      set_partner_to: (state, action) => {
        state.partner = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { set_partner_to } = partner_slice.actions
  
  export default partner_slice.reducer

  
  