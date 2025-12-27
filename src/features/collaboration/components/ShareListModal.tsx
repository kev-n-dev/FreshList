import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useCollaboration } from '../hooks/useCollaboration';

interface ShareListModalProps {
  visible: boolean;
  listId: string;
  listName: string;
  onClose: () => void;
}

export const ShareListModal: React.FC<ShareListModalProps> = ({ 
  visible, 
  listId, 
  listName, 
  onClose 
}) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'read' | 'write'>('read');
  const { shareList, onlineUsers } = useCollaboration();

  const handleShare = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    const success = await shareList(listId, email.trim(), permission);
    if (success) {
      setEmail('');
      onClose();
    }
  };

  const selectUser = (userEmail: string) => {
    setEmail(userEmail);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Share "{listName}"</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Permission</Text>
          <View style={styles.permissionContainer}>
            <TouchableOpacity
              style={[styles.permissionButton, permission === 'read' && styles.selected]}
              onPress={() => setPermission('read')}
            >
              <Text style={[styles.permissionText, permission === 'read' && styles.selectedText]}>
                View Only
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.permissionButton, permission === 'write' && styles.selected]}
              onPress={() => setPermission('write')}
            >
              <Text style={[styles.permissionText, permission === 'write' && styles.selectedText]}>
                Can Edit
              </Text>
            </TouchableOpacity>
          </View>

          {onlineUsers.length > 0 && (
            <>
              <Text style={styles.label}>Quick Select</Text>
              <View style={styles.userList}>
                {onlineUsers.map(user => (
                  <TouchableOpacity
                    key={user.id}
                    style={styles.userItem}
                    onPress={() => selectUser(user.email)}
                  >
                    <Text style={styles.userName}>{user.displayName}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  permissionContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  permissionButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  permissionText: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  userList: {
    maxHeight: 120,
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    fontWeight: '500',
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
  },
  shareText: {
    color: '#fff',
    fontWeight: '600',
  },
});