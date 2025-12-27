import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList, TabParamList} from './types';
import ListsScreen from '@features/lists/screens/ListsScreen';
import ListDetailScreen from '@features/lists/screens/ListDetailScreen';
import AddListScreen from '@features/lists/screens/AddListScreen';
import EditListScreen from '@features/lists/screens/EditListScreen';
import AddItemScreen from '@features/items/screens/AddItemScreen';
import EditItemScreen from '@features/items/screens/EditItemScreen';
import SettingsScreen from '@features/settings/screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        const iconName = route.name === 'Lists' ? 'list' : 'settings';
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="Lists" component={ListsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}} />
      <Stack.Screen name="ListDetail" component={ListDetailScreen} options={{title: 'Shopping List'}} />
      <Stack.Screen name="AddList" component={AddListScreen} options={{title: 'Add List'}} />
      <Stack.Screen name="EditList" component={EditListScreen} options={{title: 'Edit List'}} />
      <Stack.Screen name="AddItem" component={AddItemScreen} options={{title: 'Add Item'}} />
      <Stack.Screen name="EditItem" component={EditItemScreen} options={{title: 'Edit Item'}} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;