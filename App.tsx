// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './navigation/AppNavigator';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

const Stack = createStackNavigator();
// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default function App() {
  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
      <AppNavigator />
    </ThemeContext.Provider>
  );
}
