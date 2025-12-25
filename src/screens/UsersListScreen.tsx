import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../hooks/useDebounce';
import { AppDispatch, RootState } from '../app/store';
import { UserRoutes } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadUsers, saveUsers } from '../utils/storage';
import { setUsers } from '../features/users/usersSlice';
import Colors from '../theme/colors';

type Props = NativeStackScreenProps<UserRoutes, 'Users'>;

const UsersListScreen = ({ navigation }: Props) => {
  const users = useSelector((state: RootState) => state.users.users);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 300);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await loadUsers();
      dispatch(setUsers(data));
    };
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    const persistUsers = async () => {
      await saveUsers(users);
    };

    persistUsers();
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [users, debouncedSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${filteredUsers.length} users...`}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('UserDetails')}
        >
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flex}>
        <Text style={styles.fontStyle}>Users visible: </Text>
        <Text style={styles.fontStyle}>{filteredUsers.length}</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredUsers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('UserDetails', { user: item })}
          >
            <View
              style={!item.isActive ? styles.activeStyle : styles.deactiveStyle}
            ></View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subText}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found.</Text>
        }
      />
    </View>
  );
};

export default UsersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.mainBackground,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  subText: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textNotFound,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: Colors.textNotFound,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    backgroundColor: Colors.success,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  activeStyle: {
    backgroundColor: Colors.error,
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  deactiveStyle: {
    backgroundColor: Colors.success,
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  flex: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  fontStyle: {
    fontWeight: 600,
    fontSize: 16,
  },
});
