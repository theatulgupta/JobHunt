import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allJobs: [],
  job: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setJob: (state, action) => {
      state.job = action.payload;
    },
  },
});
export const { setAllJobs, setJob } = jobSlice.actions;
export default jobSlice.reducer;
