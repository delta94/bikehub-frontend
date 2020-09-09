import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StackNavigator from './news/NewsStackNavigator';
import { useColorScheme } from 'react-native-appearance';
import { StyleSheet } from 'react-native';
import AccountLoginCheckNavigator from './account/AccountLoginCheckNavigator'
import FcStackNavigator from './fc/FcStackNavigator'

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
        component={FcStackNavigator}
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
        component={AccountLoginCheckNavigator}
        options={{
          tabBarLabel: '保存記事',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountLoginCheckNavigator}
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
