import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import PasswordResetScreen from '../../screens/auth/PasswordResetScreen';
import RegistrationScreen from '../../screens/auth/RegistrationScreen';
import DetailScreen from '../../screens/auth/DetailScreen';
import TermsOfServiceScreen from '../../screens/auth/TermsOfServiceScreen';
import HomeAccountScreen from '../../screens/auth/HomeAccountScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default function StackNavigator({ initialRouteName }: { initialRouteName: string }) {
  initialRouteName = initialRouteName ? initialRouteName : "ログイン"
  const ArticleStack = createStackNavigator();
  return (
    <ArticleStack.Navigator initialRouteName={initialRouteName}>
      <ArticleStack.Screen
        name="ログイン"
        component={LoginScreen}
        options={{
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <ArticleStack.Screen
        name="パスワード再設定"
        component={PasswordResetScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <ArticleStack.Screen
        name="ユーザー詳細"
        component={DetailScreen}
        options={{
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <ArticleStack.Screen
        name="ユーザー登録"
        component={RegistrationScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <ArticleStack.Screen
        name="利用規約"
        component={TermsOfServiceScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
    </ArticleStack.Navigator>
  );
}
