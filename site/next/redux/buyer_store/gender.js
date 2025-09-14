import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gender: null,
  }
  
  export const GenderSlice = createSlice({
    name: 'gender',
    initialState,
    reducers: {
      setGenderTo: (state, action) => {
        state.gender = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setGenderTo } = GenderSlice.actions
  
  export default GenderSlice.reducer

  
  