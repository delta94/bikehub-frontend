import React from 'react';
import ArticleScreen from '../../screens/news/ArticleScreen';
import ArticleViewScreen from '../../screens/news/ArticleViewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './NewsTabNavigator';
import { useColorScheme } from 'react-native-appearance';
import BookmarkButton from '../../components/news/BookmarkButton';
export default function NewsStackNavigator() {
  const ArticleStack = createStackNavigator();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';

  return (
    <ArticleStack.Navigator
      screenOptions={{
        headerTintColor: textColor,
      }}
    >
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
        options={({ route }) => ({
          headerRight: ({ tintColor }) => (
            <BookmarkButton tintColor={tintColor} route={route} />
          ),
          gestureResponseDistance: {
            horizontal: 1000,
            vertical: 135,
          },
        })}
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
