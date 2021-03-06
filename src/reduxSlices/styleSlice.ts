import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import styleService from "../reduxServices/styleService";

interface StyleState {
  styles: IStyle[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: StyleState = {
  styles: [],
  loading: false,
  error: null,
  message: null
};
export const stylesFetchAsync = createAsyncThunk(
  'style/fetchAllByCompanyId',
  async (companyId: string, { rejectWithValue }) => {
    try {
      const response = await styleService.fetchStyles(companyId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const styleFetchAsync = createAsyncThunk(
  'style/fetchOneByStyleId',
  async (styleId: string, { rejectWithValue }) => {
    try {
      const response = await styleService.fetchStyle(styleId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const styleEditInfoAsync = createAsyncThunk(
  'style/editInfo',
  async (data: IEditStyleInfo, { rejectWithValue }) => {
    try {
      if (data.originalStyle) {
        var copyStyle = { ...data.originalStyle };
        if (copyStyle) {
          copyStyle.name = data.name;
          copyStyle.orderNumber = data.orderNumber;
          copyStyle.styleNumber = data.styleNumber;
          copyStyle.productType = data.productType;
          copyStyle.productGroup = data.productGroup;
          copyStyle.description = data.description;
          // TODO: ALL DATA IS NOT MAPPED !

          const response = await styleService.edit(copyStyle);
          return response;
        }
        //else return ??
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


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
        state.styles = [];
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
        state.styles = [];
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to fetch styles';
        }
        state.message = null;
      })
      // FETCH ONE
      .addCase(styleFetchAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(styleFetchAsync.fulfilled, (state, action) => {
        //Load state.sizes by id. If new id, add. If excisting id, update.
        var index = state.styles.findIndex(x => x.id == action.payload.id);
        if (index != -1) {
          state.styles.splice(index, 1, action.payload);
        }
        else {
          console.log("Log: SizeRange push");
          state.styles.push(action.payload);
        }
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(styleFetchAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to fetch style';
        }
        state.message = null;
      })
      // EDIT STYLE INFO
      .addCase(styleEditInfoAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(styleEditInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // Vad g??ra ? F??r en style tillbaka - finns inget state f??r det ? som motsvarar "current user" ex  ...
          state.styles = state.styles?.filter(s => s.id != action.payload?.id);  // TA BORT KOMMENTAR N??R FUNKAR
          state.styles?.push(action.payload); // TA BORT KOMMENTAR N??R FUNKAR
        }
        state.error = null;
        state.message = "Style Information updated";
      })
      .addCase(styleEditInfoAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to update Style Information';
        }
        state.message = 'Faild to update Style Information';
      });
  }
});

export const { styleResetMessages } = styleSlice.actions;

export default styleSlice.reducer;