import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import ArticleScreen from '../screens/ArticleScreen';
import ArticleViewScreen from '../screens/ArticleViewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

export default function StackNavigator({ route }: any) {
  const ArticleStack = createStackNavigator();

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
