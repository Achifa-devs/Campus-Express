import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    savedItem: [],
  }
  
  export const SaveSlice = createSlice({
    name: 'savedItem',
    initialState,
    reducers: {
      
      setSaveTo: (state, action) => {
        state.savedItem = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSaveTo } = SaveSlice.actions
  
  export default SaveSlice.reducer

  
  