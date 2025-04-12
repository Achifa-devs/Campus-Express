import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  drawer: null,
}

export const drawer_slice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    set_drawer: (state, action) => {
      state.drawer = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_drawer } = drawer_slice.actions

export default drawer_slice.reducer

  
  