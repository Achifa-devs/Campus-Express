import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    menu: 'personal_data',
  }
  
  export const menuSlice = createSlice({
    name: 'menu',
    initialState,  
    reducers: {
      
      setMenuTo: (state, action) => {
        state.menu = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setMenuTo } = menuSlice.actions
  
  export default menuSlice.reducer

  
  