import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: '',
  }
  
  export const typeSlice = createSlice({
    name: 'type',
    initialState,  
    reducers: {
      
      settypeTo: (state, action) => {
        state.type = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setTypeTo } = typeSlice.actions
  
  export default typeSlice.reducer

  
  