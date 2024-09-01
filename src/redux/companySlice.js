import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
