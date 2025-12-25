import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../features/users/usersSlice';
import UserForm from '../components/UserForm';
import { UserRoutes, User } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppDispatch } from '../app/store';
import Colors from '../theme/colors';

type Props = NativeStackScreenProps<UserRoutes, 'UserDetails'>;

const UserDetailsScreen = ({ route, navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = route.params?.user;

  const handleSubmit = (data: Omit<User, 'id'>) => {
    if (user) {
      dispatch(updateUser({ ...user, ...data }));
    } else {
      dispatch(addUser(data));
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!user) return;
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          dispatch(deleteUser(user.id));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <UserForm
        defaultValues={
          user || {
            name: '',
            email: '',
            phone: '',
            age: 0,
            address: '',
            isActive: true,
          }
        }
        onSubmit={handleSubmit}
      />

      {user && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default UserDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  deleteButton: {
    backgroundColor: Colors.error,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  deleteButtonText: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
});