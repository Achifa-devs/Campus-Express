import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: false
}

export const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setUserAuthTo: (state, action) => {
      state.auth = action.payload  
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserAuthTo } = userAuthSlice.actions
export const userAuth =  userAuthSlice.reducer









