import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const user_slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_user } = user_slice.actions

export default user_slice.reducer

  
  