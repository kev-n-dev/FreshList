import {useCallback} from 'react';
import {useAppDispatch} from './redux';
import {addItem, updateItem, toggleItem, deleteItem} from '@store/slices/itemsSlice';
import {ShoppingItem} from '@types/index';

export const useOptimisticUpdates = () => {
  const dispatch = useAppDispatch();

  const optimisticAddItem = useCallback((item: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch(addItem(item));
  }, [dispatch]);

  const optimisticUpdateItem = useCallback((update: Partial<ShoppingItem> & {id: string}) => {
    dispatch(updateItem(update));
  }, [dispatch]);

  const optimisticToggleItem = useCallback((itemId: string) => {
    dispatch(toggleItem(itemId));
  }, [dispatch]);

  const optimisticDeleteItem = useCallback((itemId: string) => {
    dispatch(deleteItem(itemId));
  }, [dispatch]);

  return {
    optimisticAddItem,
    optimisticUpdateItem,
    optimisticToggleItem,
    optimisticDeleteItem,
  };
};