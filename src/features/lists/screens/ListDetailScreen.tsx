import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {toggleItem, deleteItem} from '@store/slices/itemsSlice';
import {RootStackParamList} from '@navigation/types';
import {ShoppingItem} from '@types/index';
import {ShareListModal} from '@features/collaboration/components/ShareListModal';
import {useCollaboration} from '@features/collaboration/hooks/useCollaboration';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type RouteProp = RouteProp<RootStackParamList, 'ListDetail'>;

const ListDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const dispatch = useAppDispatch();
  const {listId} = route.params;
  const [showShareModal, setShowShareModal] = useState(false);
  const {currentUser} = useCollaboration();

  const list = useAppSelector(state => state.lists.lists.find(l => l.id === listId));
  const items = useAppSelector(state => 
    state.items.items.filter(item => item.listId === listId)
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: list?.name || 'Shopping List',
      headerRight: () => (
        <View style={styles.headerButtons}>
          {currentUser && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowShareModal(true)}>
              <Icon name="share" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('AddItem', {listId})}>
            <Icon name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, list?.name, listId, currentUser]);

  const handleToggleItem = (itemId: string) => {
    dispatch(toggleItem(itemId));
  };

  const handleDeleteItem = (itemId: string) => {
    dispatch(deleteItem(itemId));
  };

  const renderItem = React.useCallback(({item}: {item: ShoppingItem}) => (
    <TouchableOpacity
      style={[styles.itemContainer, item.completed && styles.completedItem]}
      onPress={() => handleToggleItem(item.id)}>
      <View style={styles.itemContent}>
        <Icon
          name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={24}
          color={item.completed ? '#4CAF50' : '#ccc'}
        />
        <View style={styles.itemDetails}>
          <Text style={[styles.itemName, item.completed && styles.completedText]}>
            {item.name}
          </Text>
          <View style={styles.itemMeta}>
            <Text style={styles.quantity}>Qty: {item.quantity}</Text>
            {item.category && <Text style={styles.category}>{item.category}</Text>}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}>
        <Icon name="delete" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  ), []);

  const keyExtractor = React.useCallback((item: ShoppingItem) => item.id, []);

  if (!list) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>List not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="shopping-cart" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No items yet</Text>
            <Text style={styles.emptySubtext}>Tap + to add your first item</Text>
          </View>
        }
      />
      
      <ShareListModal
        visible={showShareModal}
        listId={listId}
        listName={list?.name || 'Shopping List'}
        onClose={() => setShowShareModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerButton: {
    marginRight: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedItem: {
    opacity: 0.6,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  itemMeta: {
    flexDirection: 'row',
    marginTop: 4,
  },
  quantity: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  category: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default ListDetailScreen;