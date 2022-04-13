import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import measurementPointService from '../reduxServices/measurementPointService';
import sizeRangeService from '../reduxServices/sizeRangeService';

interface SizeRangeState {
  sizeRanges: ISizeRange[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: SizeRangeState = {
  sizeRanges: [],
  loading: false,
  error: null,
  message: null
};

export const sizeRangeFetchAsync = createAsyncThunk(
  'style/fetchAllByStyleId',
  async (measurementId: string) => {
    var result = await sizeRangeService.fetchSizeRange(measurementId);
    return result;
  }
);

export const sizeRangeSlice = createSlice({
  name: 'sizerange',
  initialState,
  reducers: {
    sizeRangeMessages: (state) => {
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(sizeRangeFetchAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sizeRangeFetchAsync.fulfilled, (state, action) => {

        //Load state.SizeRange by id. If new id, add. If excisting id, update.
        var index = state.sizeRanges.findIndex(x => x.id == action.payload.id);
        if (index != -1) {
          state.sizeRanges.splice(index, 1, action.payload);
        }
        else {
          console.log("Log: SizeRange push");
          state.sizeRanges.push(action.payload);
        }
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(sizeRangeFetchAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to fetch sizeRange';
        }
        state.message = null;
      });
  }
});

export const { sizeRangeMessages } = sizeRangeSlice.actions;

export default sizeRangeSlice.reducer;