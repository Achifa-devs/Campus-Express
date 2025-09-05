import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tier: 'Free',
}

export const tier_slice = createSlice({
  name: 'tier',
  initialState,
  reducers: {
    set_tier: (state, action) => {
      state.tier = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_tier } = tier_slice.actions

export default tier_slice.reducer

  
  