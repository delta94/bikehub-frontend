import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import SearchFcScreen from '../../screens/fc/SearchFcScreen';
import FcDetailScreen from '../../screens/fc/FcDetailScreen';
import HomeFcScreen from '../../screens/fc/HomeFcScreen';
import PasswordResetScreen from '../../screens/auth/PasswordResetScreen';
import RegistrationScreen from '../../screens/auth/RegistrationScreen';
import DetailScreen from '../../screens/auth/DetailScreen';
import TermsOfServiceScreen from '../../screens/auth/TermsOfServiceScreen';
import HomeAccountScreen from '../account/AccountLoginCheckNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';

export default function StackNavigator({ initialRouteName }: { initialRouteName: string }) {
  initialRouteName = initialRouteName ? initialRouteName : "HOME-燃費-"
  const FcStack = createStackNavigator();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';

  return (
    <FcStack.Navigator
      screenOptions={{
        headerTintColor: textColor,
      }}
      initialRouteName={initialRouteName}
    >
      <FcStack.Screen
        name="HOME-燃費-"
        component={HomeFcScreen}
        options={{
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <FcStack.Screen
        name="燃費検索"
        component={SearchFcScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <FcStack.Screen
        name="燃費詳細"
        options={({ route }) => ({
          title: route.params.bikeName,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        })}
        component={FcDetailScreen}
      />
      <FcStack.Screen
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
      <FcStack.Screen
        name="パスワード再設定"
        component={PasswordResetScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <FcStack.Screen
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
      <FcStack.Screen
        name="ユーザー登録"
        component={RegistrationScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <FcStack.Screen
        name="利用規約"
        component={TermsOfServiceScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
    </FcStack.Navigator>
  );
}
