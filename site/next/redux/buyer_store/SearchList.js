import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    SearchList: [],
  }
  
  export const SearchListSlice = createSlice({
    name: 'SearchList',
    initialState,
    reducers: {
      
      setSearchListTo: (state, action) => {
        state.SearchList = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSearchListTo } = SearchListSlice.actions
  
  export default SearchListSlice.reducer

  
  