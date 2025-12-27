import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch} from '@hooks/redux';
import {addItem} from '@store/slices/itemsSlice';
import {RootStackParamList} from '@navigation/types';
import {BarcodeScanner} from '@features/barcode/components/BarcodeScanner';
import {VoiceInputButton} from '@features/voice/components/VoiceInputButton';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type RouteProp = RouteProp<RootStackParamList, 'AddItem'>;

const CATEGORIES = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Frozen', 'Other'];

const AddItemScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const dispatch = useAppDispatch();
  const {listId} = route.params;

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    const qty = parseInt(quantity) || 1;
    dispatch(addItem({
      listId,
      name: name.trim(),
      quantity: qty,
      category: category || undefined,
      completed: false,
    }));
    navigation.goBack();
  };

  const handleBarcodeScan = (barcode: string, product: any) => {
    if (product) {
      setName(product.name);
      setCategory(product.category || '');
    } else {
      setName(barcode);
    }
    setShowScanner(false);
  };

  const handleVoiceCommand = (command: { action: string; item: string }) => {
    if (command.action === 'add_item' && command.item) {
      setName(command.item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter item name"
          autoFocus
          maxLength={50}
        />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          placeholder="1"
          keyboardType="numeric"
          maxLength={3}
        />

        <Text style={styles.label}>Category (Optional)</Text>
        <View style={styles.categoryContainer}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, category === cat && styles.selectedCategory]}
              onPress={() => setCategory(category === cat ? '' : cat)}>
              <Text style={[styles.categoryText, category === cat && styles.selectedCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.scanButton} onPress={() => setShowScanner(true)}>
            <Text style={styles.scanButtonText}>📷 Scan</Text>
          </TouchableOpacity>
          <VoiceInputButton onVoiceCommand={handleVoiceCommand} />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showScanner} animationType="slide">
        <BarcodeScanner
          onScan={handleBarcodeScan}
          onClose={() => setShowScanner(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  categoryButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddItemScreen;