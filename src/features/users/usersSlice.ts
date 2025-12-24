import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersState } from '../../types';

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: {
      reducer: (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      },
      prepare: (user: Omit<User, 'id'>) => ({
        payload: { id: nanoid(), ...user },
      }),
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
