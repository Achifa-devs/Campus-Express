import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'buyer'
}

export const userModeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    
    setUserModeTo: (state, action) => {
      state.mode = action.payload  
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserModeTo } = userModeSlice.actions
export const userMode =  userModeSlice.reducer








