import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/index';

export const selectLists = (state: RootState) => state.lists.lists;
export const selectActiveListId = (state: RootState) => state.lists.activeListId;
export const selectItems = (state: RootState) => state.items.items;

export const selectActiveList = createSelector(
  [selectLists, selectActiveListId],
  (lists, activeListId) => lists.find(list => list.id === activeListId)
);

export const selectItemsByListId = createSelector(
  [selectItems, (_: RootState, listId: string) => listId],
  (items, listId) => items.filter(item => item.listId === listId)
);

export const selectCompletedItems = createSelector(
  [selectItemsByListId],
  (items) => items.filter(item => item.completed)
);

export const selectPendingItems = createSelector(
  [selectItemsByListId],
  (items) => items.filter(item => !item.completed)
);