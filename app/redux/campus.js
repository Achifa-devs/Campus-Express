import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  campus: 'All campus',
}

export const campus_slice = createSlice({
  name: 'campus',
  initialState,
  reducers: {
    set_campus: (state, action) => {
      state.campus = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_campus } = campus_slice.actions

export default campus_slice.reducer

  
  