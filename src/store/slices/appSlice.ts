import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '@types/index';

const initialState: AppState = {
  theme: 'light',
  isOnline: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const {setTheme, setOnlineStatus} = appSlice.actions;
export default appSlice.reducer;