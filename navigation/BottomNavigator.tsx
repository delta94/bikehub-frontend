import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../screens/auth/LoginScreen';
import StackNavigator from './news/StackNavigator';
const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Feed"
        component={StackNavigator}
        options={{
          tabBarLabel: 'ニュース',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="fenewspaper-variant-outlineed"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fc"
        component={LoginScreen}
        options={{
          tabBarLabel: '燃費登録',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="gas-station"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SavedArticle"
        component={LoginScreen}
        options={{
          tabBarLabel: '保存記事',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="pbookmark-multiplein"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={LoginScreen}
        options={{
          tabBarLabel: 'ユーザー',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-box"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
