// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './navigation/AppNavigator';

const Stack = createStackNavigator();

export default function App() {
  return <AppNavigator />;
}
