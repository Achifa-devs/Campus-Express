import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggleMessage: '',
}

export const toggleMessageSlice = createSlice({
  name: 'toggleMessage',
  initialState,
  reducers: {
    setToggleMessage: (state, action) => {
      state.toggleMessage = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToggleMessage } = toggleMessageSlice.actions

export default toggleMessageSlice.reducer

  
  