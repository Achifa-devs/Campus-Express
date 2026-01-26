import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    delete_list: [],
  }
  
  export const deleteListSlice = createSlice({
    name: 'delete_list',
    initialState,  
    reducers: {
      
      setDeleteListTo: (state, action) => {
        state.delete_list = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setDeleteListTo } = deleteListSlice.actions
  
  export default deleteListSlice.reducer

  
  