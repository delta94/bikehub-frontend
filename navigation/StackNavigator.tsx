import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import HomeScreen from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';
import ArticleViewScreen from '../screens/ArticleViewScreen';
import { createStackNavigator } from '@react-navigation/stack';

type NewsCardProps = {
  category: string;
  route: any;
};

export default function StackNavigator({ route }) {
  const Stack = createStackNavigator();
  const category = route.params.category;
  // const { category } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ category: category }}
      />
      <Stack.Screen name="記事" component={ArticleScreen} />
      <Stack.Screen name="オリジナルサイト" component={ArticleViewScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
