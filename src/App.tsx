import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, AppDispatch, RootState } from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;
