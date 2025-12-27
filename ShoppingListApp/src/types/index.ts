export interface ShoppingList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingItem {
  id: string;
  listId: string;
  name: string;
  quantity: number;
  category?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  theme: 'light' | 'dark';
  isOnline: boolean;
}