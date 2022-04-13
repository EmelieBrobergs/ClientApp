import { elementAcceptingRef } from '@mui/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';
import measurementService from '../reduxServices/measurementService';

interface MeasurementState {
  measurements: IMeasurement[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: MeasurementState = {
  measurements: [],
  loading: false,
  error: null,
  message: null
};

// TODO: DB struktur och underliggande data??
export const measurementsFetchAsync = createAsyncThunk(
  'style/fetchAllByStyleId',
  async (styleId: string) => {
    var result = await measurementService.fetchMeasurements(styleId);
    return result;
  }
);

export const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    measurementResetMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    measurementSortedByCreatedDate: (state) => {
      // ✅ Sort in Ascending order (low to high)
      console.log("Sortering av measurement körs - onödigt ofta?");
      if (state.measurements.length > 1) state.measurements.sort((a: IMeasurement, b: IMeasurement) => (a.createdDate as any) - (b.createdDate as any));
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(measurementsFetchAsync.pending, state => {
        console.log("Log: measurementSlice.ts metod measurementFetchAsync. Status PENDING");
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(measurementsFetchAsync.fulfilled, (state, action) => {

        //Load state.Measurement by id. If new id, add. If excisting id, update.      //TODO: Skriv test för denna metod !!
        console.log("Log: measurementSlice.ts metod measurementFetchAsync. Status FULFILLED");
        //NOTE: ERROR: Uncaught (in promise) TypeError: action.payload.forEach is not a function  (men funka innan jag jobbad djupare?)
        Array.from(action.payload).forEach((item) => {
          var index = state.measurements.findIndex(x => x.id == item.id);
          if (index != -1) {
            state.measurements.splice(index, 1, item);
          }
          else {
            state.measurements.push(item);
          }
        });

        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(measurementsFetchAsync.rejected, (state, action) => {
        console.log("Log: measurementSlice.ts metod measurementFetchAsync. Status REJECTED");
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to fetch styles';
        }
        state.message = null;
      });
  }
});

export const { measurementResetMessages, measurementSortedByCreatedDate } = measurementSlice.actions;

export default measurementSlice.reducer;