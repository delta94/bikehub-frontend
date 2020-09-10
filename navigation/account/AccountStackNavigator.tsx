import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import PasswordResetScreen from '../../screens/auth/PasswordResetScreen';
import RegistrationScreen from '../../screens/auth/RegistrationScreen';
import DetailScreen from '../../screens/auth/DetailScreen';
import TermsOfServiceScreen from '../../screens/auth/TermsOfServiceScreen';
import HomeAccountScreen from './AccountLoginCheckNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';

export default function StackNavigator({ initialRouteName }: { initialRouteName: string }) {
  initialRouteName = initialRouteName ? initialRouteName : "ログイン"
  const AccountStack = createStackNavigator();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';

  return (
    <AccountStack.Navigator
      screenOptions={{
        headerTintColor: textColor,
      }}
      initialRouteName={initialRouteName}
    >
      <AccountStack.Screen
        name="ログイン"
        component={LoginScreen}

        options={{
          gestureEnabled: false,
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <AccountStack.Screen
        name="パスワード再設定"
        component={PasswordResetScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <AccountStack.Screen
        name="ユーザー詳細"
        component={DetailScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <AccountStack.Screen
        name="ユーザー登録"
        component={RegistrationScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <AccountStack.Screen
        name="利用規約"
        component={TermsOfServiceScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
    </AccountStack.Navigator>
  );
}
