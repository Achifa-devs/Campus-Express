import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  socket_client: null,
}

export const socket_client_slice = createSlice({
  name: 'socket_client',
  initialState,
  reducers: {
    set_socket_client: (state, action) => {
      state.socket_client = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_socket_client } = socket_client_slice.actions

export default socket_client_slice.reducer

  
  