import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface HistoryItem {
  id: string;
  name: string;
  category: string;
  frequency: number;
  lastPurchased: string;
}

interface HistoryState {
  items: HistoryItem[];
}

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<{ name: string; category: string }>) => {
      const existing = state.items.find(item => item.name === action.payload.name);
      if (existing) {
        existing.frequency += 1;
        existing.lastPurchased = new Date().toISOString();
      } else {
        state.items.push({
          id: Date.now().toString(),
          name: action.payload.name,
          category: action.payload.category,
          frequency: 1,
          lastPurchased: new Date().toISOString(),
        });
      }
    },
  },
});

export const { addToHistory } = historySlice.actions;
export const selectPurchaseHistory = (state: RootState) => state.history.items;
export default historySlice.reducer;