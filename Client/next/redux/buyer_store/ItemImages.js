import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ItemImages: [],
  }
  
  export const ItemImagesSlice = createSlice({
    name: 'ItemImages',
    initialState,
    reducers: {
      
      setItemImagesTo: (state, action) => {
        state.ItemImages = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setItemImagesTo } = ItemImagesSlice.actions
  
  export default ItemImagesSlice.reducer

  
  