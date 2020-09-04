import React from 'react';
import ArticleScreen from '../../screens/news/ArticleScreen';
import ArticleViewScreen from '../../screens/news/ArticleViewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

export default function StackNavigator() {
  const ArticleStack = createStackNavigator();

  return (
    <ArticleStack.Navigator>
      <ArticleStack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <ArticleStack.Screen
        name="記事"
        component={ArticleScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
      <ArticleStack.Screen
        name="オリジナルサイト"
        component={ArticleViewScreen}
        options={{
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        }}
      />
    </ArticleStack.Navigator>
  );
}
