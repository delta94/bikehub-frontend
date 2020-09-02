// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './navigation/AppNavigator';
import { AppearanceProvider } from 'react-native-appearance';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ArticleScreen from './screens/ArticleScreen';
import ArticleViewScreen from './screens/ArticleViewScreen';
import HomeScreen from './screens/HomeScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <AppearanceProvider>
      <AppNavigator />
    </AppearanceProvider>
  );
}
