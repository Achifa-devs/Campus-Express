import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    accessory: 0,
  }
  
  export const AccessorySlice = createSlice({
    name: 'accessory',
    initialState,
    reducers: {
      
      setAccessoryTo: (state, action) => {
        state.accessory = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setAccessoryTo } = AccessorySlice.actions
  
  export default AccessorySlice.reducer

  
  