import React, { useEffect, useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AppearanceProvider } from 'react-native-appearance';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import { Provider } from 'react-redux';
import store from './store';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

export default function App() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';
  const backGroundColor = colorScheme === 'light' ? '#fff' : '#000000';
  const CustomTheme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
      ...DefaultTheme.colors,
      primary: 'green',
      // accent: textColor,
      background: 'transparent',
      // contained: textColor,
      placeholder: 'green',
      text: textColor,
    },
    dark: true,
  };
  return (
    <Provider store={store}>
      <AppearanceProvider>
        <PaperProvider theme={CustomTheme}>
          <AppNavigator />
        </PaperProvider>
      </AppearanceProvider>
    </Provider>
  );
}
