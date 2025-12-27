import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useOfflineSync } from '../../features/offline/hooks/useOfflineSync';
import { useTheme } from '../../features/theme/hooks/useTheme';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, syncQueue } = useOfflineSync();
  const { theme } = useTheme();

  if (isOnline && syncQueue.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isOnline ? theme.colors.warning : theme.colors.error,
        },
      ]}
    >
      <Text style={styles.text}>
        {!isOnline
          ? 'Offline - Changes will sync when connected'
          : `Syncing ${syncQueue.length} changes...`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});