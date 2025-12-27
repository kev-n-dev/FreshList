import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Switch, Alert} from 'react-native';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {setTheme} from '@store/slices/appSlice';
import {useCollaboration} from '@features/collaboration/hooks/useCollaboration';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useAppSelector(state => state.app);
  const {currentUser, signOut} = useCollaboration();

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Sign Out', style: 'destructive', onPress: signOut}
      ]
    );
  };

  const handleAuthAction = () => {
    if (currentUser) {
      handleSignOut();
    } else {
      navigation.navigate('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Collaboration</Text>
        {currentUser ? (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Signed in as</Text>
              <Text style={styles.infoValue}>{currentUser.displayName}</Text>
            </View>
            <TouchableOpacity style={styles.settingRow} onPress={handleSignOut}>
              <Text style={[styles.settingLabel, {color: '#FF3B30'}]}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.settingRow} onPress={handleAuthAction}>
            <Text style={[styles.settingLabel, {color: '#007AFF'}]}>Sign In to Collaborate</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
});

export default SettingsScreen;