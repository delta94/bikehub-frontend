import React, { useEffect, useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AppearanceProvider } from 'react-native-appearance';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { Provider as StoreProvider } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';

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
  const [theme, setTheme] = useState(DefaultTheme);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const textColor = colorScheme === 'light' ? '#fff' : '#000000';
    const backGroundColor = colorScheme === 'light' ? '#000000' : '#fff';
    const theme = {
      ...DefaultTheme,
      roundness: 4,
      colors: {
        ...DefaultTheme.colors,
        primary: 'green',
        // accent: textColor,
        background: 'transparent',
        // contained: textColor,
        placeholder: '#66cc00',
        text: textColor,
      },
      dark: true,
    };
    setTheme(theme);
  }, []);

  return (
    <AppearanceProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </AppearanceProvider>
  );
}
