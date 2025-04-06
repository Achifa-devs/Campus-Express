import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bankBeneficiary: null,
  }
  
  export const BankBeneficiarySlice = createSlice({
    name: 'bankBeneficiary',
    initialState,
    reducers: {
      setBankTo: (state, action) => {
        state.bankBeneficiary = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setBankTo } = BankBeneficiarySlice.actions
  
  export default BankBeneficiarySlice.reducer

  

  
  