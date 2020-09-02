import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import HomeScreen from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';
import ArticleViewScreen from '../screens/ArticleViewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';
import TabNavigator from './TabNavigator';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

type NewsCardProps = {
  category: string;
  route: any;
};

export default function StackNavigator({ route }: any) {
  const ArticleStack = createStackNavigator();
  const colorScheme = useColorScheme();
  // const { category } = route.params;

  return (
    <ArticleStack.Navigator>
      <ArticleStack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <ArticleStack.Screen name="記事" component={ArticleScreen} />
      <ArticleStack.Screen
        name="オリジナルサイト"
        component={ArticleViewScreen}
      />
    </ArticleStack.Navigator>
  );
}

const styles = StyleSheet.create({});
