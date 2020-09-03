import React from 'react';
import ArticleScreen from '../screens/ArticleScreen';
import ArticleViewScreen from '../screens/ArticleViewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';


export default function StackNavigator() {
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
