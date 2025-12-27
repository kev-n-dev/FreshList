import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShoppingItem} from '@types/index';

interface ItemsState {
  items: ShoppingItem[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newItem: ShoppingItem = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.push(newItem);
    },
    updateItem: (state, action: PayloadAction<Partial<ShoppingItem> & {id: string}>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        Object.assign(item, action.payload, {updatedAt: new Date().toISOString()});
      }
    },
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.completed = !item.completed;
        item.updatedAt = new Date().toISOString();
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    deleteItemsByListId: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.listId !== action.payload);
    },
  },
});

export const {addItem, updateItem, toggleItem, deleteItem, deleteItemsByListId} = itemsSlice.actions;
export default itemsSlice.reducer;