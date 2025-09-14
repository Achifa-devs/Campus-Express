import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    storedCategory: 'trends',
  }
  
  export const categorySlice = createSlice({
    name: 'storedCategory',
    initialState,  
    reducers: {
      
      setCategoryTo: (state, action) => {
        state.storedCategory = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setCategoryTo } = categorySlice.actions
  
  export default categorySlice.reducer

  
  