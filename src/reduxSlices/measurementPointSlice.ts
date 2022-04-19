import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import measurementPointService from '../reduxServices/measurementPointService';

interface MeasurementPointState {
  measurementPoints: IMeasurementPoint[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: MeasurementPointState = {
  measurementPoints: [],
  loading: false,
  error: null,
  message: null
};

// TODO: DB struktur och underliggande data??
export const measurementPointsFetchAsync = createAsyncThunk(
  'style/fetchAllByStyleId',
  async (measurementId: string) => {
    var result = await measurementPointService.fetchMeasurementPoints(measurementId);
    return result;
  }
);

export const measurementPointSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    measurementPointResetMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    measurementPointSortedByShortName: (state) => {
      // ✅ Sort in Ascending order (low to high)
      if (state.measurementPoints.length > 1) state.measurementPoints.sort((a: IMeasurementPoint, b: IMeasurementPoint) => (a.shortName as any) - (b.shortName as any));
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(measurementPointsFetchAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(measurementPointsFetchAsync.fulfilled, (state, action) => {

        //Load state.MeasurementPoint by id. If new id, add. If excisting id, update.
        Array.from(action.payload).forEach((item) => {
          var index = state.measurementPoints.findIndex(x => x.id == item.id);
          if (index != -1) {
            state.measurementPoints.splice(index, 1, item);
          }
          else {
            state.measurementPoints.push(item);
          }
        });

        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(measurementPointsFetchAsync.rejected, (state, action) => {
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

export const { measurementPointResetMessages, measurementPointSortedByShortName } = measurementPointSlice.actions;

export default measurementPointSlice.reducer;