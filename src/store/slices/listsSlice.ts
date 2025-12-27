import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ShoppingList} from '@types/index';

interface ListsState {
  lists: ShoppingList[];
  activeListId: string | null;
}

const initialState: ListsState = {
  lists: [],
  activeListId: null,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newList: ShoppingList = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.lists.push(newList);
      if (!state.activeListId) {
        state.activeListId = newList.id;
      }
    },
    updateList: (state, action: PayloadAction<{id: string; name: string}>) => {
      const list = state.lists.find(l => l.id === action.payload.id);
      if (list) {
        list.name = action.payload.name;
        list.updatedAt = new Date().toISOString();
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(l => l.id !== action.payload);
      if (state.activeListId === action.payload) {
        state.activeListId = state.lists[0]?.id || null;
      }
    },
    setActiveList: (state, action: PayloadAction<string>) => {
      state.activeListId = action.payload;
    },
  },
});

export const {addList, updateList, deleteList, setActiveList} = listsSlice.actions;
export default listsSlice.reducer;