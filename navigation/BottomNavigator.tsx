import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountStackNavigator from './account/AccountStackNavigator';
import StackNavigator from './news/NewsStackNavigator';
import { useColorScheme } from 'react-native-appearance';
import { StyleSheet } from 'react-native';
import HomeAccountScreen from '../screens/auth/HomeAccountScreen'

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator() {
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? '#fff' : '#000000';
  const inactiveColor = colorScheme === 'light' ? '#000000' : '#fff';

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="green"
      inactiveColor={inactiveColor}
      barStyle={{
        backgroundColor: background,
        height: 50,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={StackNavigator}
        options={{
          tabBarLabel: 'ニュース',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Fc"
        component={HomeAccountScreen}
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
        component={HomeAccountScreen}
        options={{
          tabBarLabel: '保存記事',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeAccountScreen}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabDark: {
    backgroundColor: '#000000',
  },
  tabLight: {
    backgroundColor: '#fff',
  },
});
