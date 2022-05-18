// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
 import { configureStore} from '@reduxjs/toolkit';
 import { Provider as StoreProvider } from 'react-redux';
import HomeScreen from './src/screens/Home'
import NavigationStack from './src/navigation';
import rootReducer from './src/slices';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const store = configureStore({ reducer: rootReducer });

function App() {
  return (
     <StoreProvider store={store}>
      
      <PaperProvider theme={theme}>
      
        <NavigationStack />
       
      </PaperProvider>
      
     </StoreProvider>
  );
}

export default App;