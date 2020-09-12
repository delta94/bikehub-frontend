import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import SearchFcScreen from '../../screens/fc/BikeSearchScreen';
import DetailFcScreen from '../../screens/fc/FcDetailScreen';
import RegistrationFcScreen from '../../screens/fc/FcRegistrationScreen';
import InputFcScreen from '../../screens/fc/FcInputScreen';
import HomeFcScreen from '../../screens/fc/FcHomeScreen';
import PasswordResetScreen from '../../screens/auth/PasswordResetScreen';
import RegistrationScreen from '../../screens/auth/RegistrationScreen';
import DetailScreen from '../../screens/auth/DetailScreen';
import TermsOfServiceScreen from '../../screens/auth/TermsOfServiceScreen';
import HomeAccountScreen from '../account/AccountLoginCheckNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';

export default function StackNavigator({ initialRouteName }: { initialRouteName: string }) {
  initialRouteName = initialRouteName ? initialRouteName : "HOME"
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
        name="HOME"
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
        component={DetailFcScreen}
      />
      <FcStack.Screen
        name="燃費登録"
        options={({ route }) => ({
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        })}
        component={RegistrationFcScreen}
      />
      <FcStack.Screen
        name="燃費入力"
        options={({ route }) => ({
          title: route.params.bikeName,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        })}
        component={InputFcScreen}
      />
    </FcStack.Navigator>
  );
}
