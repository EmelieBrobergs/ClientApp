import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authService from "../reduxServices/authService";
import userService from "../reduxServices/userService";

interface UserState {
  currentUser: IUser | null;
  isJwtValid: boolean; // känns inte 100% bra !, kan åeranvändas fel...tänker jag.
  //expiresAt: Date | null;  // Set time of when Token expires ? / eller ska man bara ha en "endpoint som kollar token när man laddar om"?
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isJwtValid: false,
  //expiresAt: null,
  loading: false,
  error: null,
  message: null
};

export const userLoginAsync = createAsyncThunk<IUser, IUserCredentials>(
  'users/login',
  async (credentials: IUserCredentials) => {
    const response = await authService.login(credentials.email, credentials.password);
    return response;
  }
);

export const userLogoutAsync = createAsyncThunk(
  'users/logout',
  async () => {
    await authService.logout();
  }
);
export const setCurrentUserFromLoclstorageAsync = createAsyncThunk(
  'users/setCurrentUserFromLocalstarage',
  async () => {
    const response = await authService.getCurrentUser();
    return response;
  }
);

export const userJwtValidation = createAsyncThunk<boolean>(
  'users/jwtValidation',
  async () => {
    const user = await authService.getCurrentUser();
    const response = await userService.updateLocalstorage(user.id);
    return response;
  }
);

export const userEditNameAsync = createAsyncThunk(
  'users/editUser',
  async (data: { user: IUser | null, firstName: string, lastName: string; }) => {
    if (data.user) {
      var copyUser = { ...data.user }; // TODO: Is this nessesery to not wrongly manipulate the state?
      if (copyUser) {
        copyUser.firstName = data.firstName;
        copyUser.lastName = data.lastName;
        const response = await userService.edit(copyUser);
        return response;
      }
    }
  }
);

export const userEditPasswordAsync = createAsyncThunk(
  'users/editUserPassword',
  async (data: { userId: string | undefined, passwordObject: IEditPassword; }) => {
    if (data.userId) {
      const passwordObject = data.passwordObject;
      const response = await userService.editPassword(data.userId, passwordObject);
      return response;
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userResetMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    userResetIsJwtValid: (state) => {
      state.isJwtValid = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(userLoginAsync.pending, state => {
        state.currentUser = null;
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
        state.message = null;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.currentUser = null;
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed user to login';
        }
        state.message = null;
      })
      // LOGOUT
      .addCase(userLogoutAsync.fulfilled, (state) => {
        state.currentUser = null;
        state.message = null;
      })
      //setCurrentUserFromLoclstorage
      .addCase(setCurrentUserFromLoclstorageAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      // JWT VALIDATION
      .addCase(userJwtValidation.fulfilled, (state, action) => {
        state.isJwtValid = action.payload;
      })
      .addCase(userJwtValidation.rejected, (state) => {
        state.loading = false;
        state.isJwtValid = false;
      })
      // EDIT NAME
      .addCase(userEditNameAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userEditNameAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.currentUser = action.payload;
        }
        state.error = null;
        state.message = "Name updated";
      })
      .addCase(userEditNameAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to update user';
        }
        state.message = 'Faild to update user name';
      })
      // EDIT PASSWORD
      .addCase(userEditPasswordAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userEditPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = 'Password updated';
      })
      .addCase(userEditPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'Failed to update user password';
        }
        state.message = 'Failed to update password';
      });
  }
});

export const { userResetMessages, userResetIsJwtValid } = userSlice.actions;

export default userSlice.reducer;