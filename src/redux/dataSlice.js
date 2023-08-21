import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    authId: '',
    events: [],
    openApply:false,
    academic_year:'2023/24'
  },
  reducers: {
    updateAuthId: (state, actions) => {
      state.authId = actions.payload;
    },
    updateEvents: (state, actions) => {
      state.events = actions.payload;
    },updateOpenApply: (state, actions) => {
      state.openApply = actions.payload;
    },
    updateAcademicYear: (state, actions) => {
      state.academic_year = actions.payload;
    }
  },

  
});

// Action creators are generated for each case reducer function
export const {
  updateAuthId,
  updateEvents,
  updateOpenApply,
  updateAcademicYear
} = DataSlice.actions

export default DataSlice.reducer