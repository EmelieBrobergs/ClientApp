import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import styleService from "../reduxServices/styleService";

interface StyleState {
  styles?: IStyle[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: StyleState = {
  styles: undefined,
  loading: false,
  error: null,
  message: null
};

// TODO: DB struktur och underliggande data??
export const stylesFetchAsync = createAsyncThunk(
  'style/fetchAllByCompanyId',
  async (companyId: number) => {
    const response = await styleService.fetchStyles(companyId);
    return response;
  }
);

// TODO: Hämta all underliggande data som visas när man går in på en style... spara hur?


export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    styleResetMessages: (state) => {
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
    // FETCH ALL
      .addCase(stylesFetchAsync.pending, state => {
        state.styles = undefined;
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(stylesFetchAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.styles = action.payload;
        state.error = null;
        state.message = null;
      })
      .addCase(stylesFetchAsync.rejected, (state, action) => {
        state.styles = undefined;
        state.loading = false;
        if(action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to fetch styles';
        }
        state.message = null;
      })
  }
});

export const { styleResetMessages } = styleSlice.actions;

export default styleSlice.reducer;