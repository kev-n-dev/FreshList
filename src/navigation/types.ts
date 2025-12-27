export type RootStackParamList = {
  Home: undefined;
  ListDetail: {listId: string};
  AddList: undefined;
  EditList: {listId: string};
  AddItem: {listId: string};
  EditItem: {itemId: string; listId: string};
};

export type TabParamList = {
  Lists: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}