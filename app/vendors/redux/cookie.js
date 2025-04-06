import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cookie: null,
}

export const cookie_slice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    set_cookie: (state, action) => {
      state.cookie = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_cookie } = cookie_slice.actions

export default cookie_slice.reducer

  
  