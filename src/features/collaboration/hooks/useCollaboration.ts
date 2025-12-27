import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

interface User {
  id: string;
  email: string;
  displayName: string;
}

interface SharedList {
  id: string;
  name: string;
  ownerId: string;
  collaborators: string[];
  permissions: Record<string, 'read' | 'write' | 'admin'>;
}

interface CollaborationEvent {
  type: 'item_added' | 'item_removed' | 'item_checked' | 'list_updated';
  listId: string;
  userId: string;
  data: any;
  timestamp: number;
}

export const useCollaboration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sharedLists, setSharedLists] = useState<SharedList[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  // Mock authentication
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      // Mock user
      const user: User = {
        id: 'user_123',
        email,
        displayName: email.split('@')[0]
      };
      setCurrentUser(user);
      setIsConnected(true);
      return user;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    setCurrentUser(null);
    setIsConnected(false);
    setSharedLists([]);
    setOnlineUsers([]);
  }, []);

  const shareList = useCallback(async (listId: string, userEmail: string, permission: 'read' | 'write') => {
    try {
      // Mock sharing logic
      const mockSharedList: SharedList = {
        id: listId,
        name: 'Shared List',
        ownerId: currentUser?.id || '',
        collaborators: [userEmail],
        permissions: { [userEmail]: permission }
      };
      
      setSharedLists(prev => [...prev, mockSharedList]);
      
      Alert.alert('Success', `List shared with ${userEmail}`);
      return true;
    } catch (error) {
      console.error('Share list failed:', error);
      Alert.alert('Error', 'Failed to share list');
      return false;
    }
  }, [currentUser]);

  const removeCollaborator = useCallback(async (listId: string, userId: string) => {
    try {
      setSharedLists(prev => 
        prev.map(list => 
          list.id === listId 
            ? { ...list, collaborators: list.collaborators.filter(id => id !== userId) }
            : list
        )
      );
      return true;
    } catch (error) {
      console.error('Remove collaborator failed:', error);
      return false;
    }
  }, []);

  const updatePermission = useCallback(async (listId: string, userId: string, permission: 'read' | 'write' | 'admin') => {
    try {
      setSharedLists(prev => 
        prev.map(list => 
          list.id === listId 
            ? { ...list, permissions: { ...list.permissions, [userId]: permission } }
            : list
        )
      );
      return true;
    } catch (error) {
      console.error('Update permission failed:', error);
      return false;
    }
  }, []);

  const broadcastEvent = useCallback((event: CollaborationEvent) => {
    // Mock real-time event broadcasting
    console.log('Broadcasting event:', event);
  }, []);

  // Mock real-time connection
  useEffect(() => {
    if (currentUser) {
      // Simulate online users
      setOnlineUsers([
        { id: 'user_456', email: 'john@example.com', displayName: 'John' },
        { id: 'user_789', email: 'jane@example.com', displayName: 'Jane' }
      ]);
    }
  }, [currentUser]);

  return {
    isConnected,
    currentUser,
    sharedLists,
    onlineUsers,
    signIn,
    signOut,
    shareList,
    removeCollaborator,
    updatePermission,
    broadcastEvent
  };
};