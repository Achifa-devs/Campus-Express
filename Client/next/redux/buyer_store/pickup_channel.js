import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pickup_channel: [],
  }
  
  export const pickuoChannelSlice = createSlice({
    name: 'pickup_channel',
    initialState,
    reducers: {
      
      setPickupChannelTo: (state, action) => {
        state.pickup_channel = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setPickupChannelTo } = pickuoChannelSlice.actions
  
  export default pickuoChannelSlice.reducer

  
  