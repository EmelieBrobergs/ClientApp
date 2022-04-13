import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gradingService from '../reduxServices/gradingService';

interface gradingState {
  gradings: IGrading[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: gradingState = {
  gradings: [],
  loading: false,
  error: null,
  message: null
};

// TODO: DB struktur och underliggande data??
export const gradingsFetchAsync = createAsyncThunk(
  'style/fetchgradingsbymeasurementpointid',
  async (measurementPointId: string) => {
    var result = await gradingService.fetchGradings(measurementPointId);
    return result;
  }
);

export const gradingSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    gradingResetMessages: (state) => {
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(gradingsFetchAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(gradingsFetchAsync.fulfilled, (state, action) => {

        //Load state.Gradings by id. If new id, add. If excisting id, update.
        Array.from(action.payload).forEach((item) => {
          var index = state.gradings.findIndex(x => x.id == item.id);
          if (index != -1) {
            state.gradings.splice(index, 1, item);
          }
          else {
            state.gradings.push(item);
          }
        });

        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(gradingsFetchAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to fetch gradings';
        }
        state.message = null;
      });
  }
});

export const { gradingResetMessages } = gradingSlice.actions;

export default gradingSlice.reducer;