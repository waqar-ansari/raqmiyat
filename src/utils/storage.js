import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS_DATA';

export const saveUsers = async users => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loadUsers = async () => {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};