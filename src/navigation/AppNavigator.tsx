import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersListScreen from '../screens/UsersListScreen';
import LoginScreen from '../screens/LoginScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import { User } from '../types';

export type UserRoutes = {
  Login: undefined;
  Users: undefined;
  UserDetails: { user?: User } | undefined;
};

const Stack = createNativeStackNavigator<UserRoutes>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Users" component={UsersListScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
