import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AppearanceProvider } from 'react-native-appearance';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

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
      <AppearanceProvider>
        <AppNavigator />
      </AppearanceProvider>
    </ThemeContext.Provider>
  );
}
