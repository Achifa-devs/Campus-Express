import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ActiveImg: 0,
  }
  
  export const ActiveImgSlice = createSlice({
    name: 'ActiveImg',
    initialState,
    reducers: {
      
      setActiveImgTo: (state, action) => {
        state.ActiveImg = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setActiveImgTo } = ActiveImgSlice.actions
  
  export default ActiveImgSlice.reducer

  
  