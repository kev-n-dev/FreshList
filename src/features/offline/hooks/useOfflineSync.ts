import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QueuedAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [syncQueue, setSyncQueue] = useState<QueuedAction[]>([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      if (state.isConnected) {
        processSyncQueue();
      }
    });

    loadSyncQueue();
    return unsubscribe;
  }, []);

  const loadSyncQueue = async () => {
    try {
      const queue = await AsyncStorage.getItem('syncQueue');
      if (queue) {
        setSyncQueue(JSON.parse(queue));
      }
    } catch (error) {
      console.error('Failed to load sync queue:', error);
    }
  };

  const addToQueue = async (action: Omit<QueuedAction, 'id' | 'timestamp'>) => {
    const queuedAction: QueuedAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const newQueue = [...syncQueue, queuedAction];
    setSyncQueue(newQueue);
    await AsyncStorage.setItem('syncQueue', JSON.stringify(newQueue));
  };

  const processSyncQueue = async () => {
    if (syncQueue.length === 0) return;

    try {
      // Process each queued action
      for (const action of syncQueue) {
        // Implement actual sync logic here
        console.log('Syncing action:', action);
      }

      // Clear queue after successful sync
      setSyncQueue([]);
      await AsyncStorage.removeItem('syncQueue');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  return { isOnline, addToQueue, syncQueue };
};