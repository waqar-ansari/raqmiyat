export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  isActive: boolean;
};


export type UsersState = {
  users: User[];
};

export type UserRoutes = {
  Users: undefined;
  UserDetails: { user?: User } | undefined;
   Login: undefined;
};
