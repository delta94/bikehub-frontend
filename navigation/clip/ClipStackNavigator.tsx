import React from 'react';
import ClipScreen from '../../screens/clip/ClipScreen';
import ClipViewScreen from '../../screens/clip/ClipViewScreen';
import ClipHomeScreen from '../../screens/clip/ClipHomeScreen';
import ArticleViewScreen from '../../screens/news/ArticleViewScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native-appearance';
import BookmarkButton from '../../components/news/BookmarkButton';
export default function ClipStackNavigator() {
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
        component={ClipHomeScreen}
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
        component={ClipScreen}
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
        component={ClipViewScreen}
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
