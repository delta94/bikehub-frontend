import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';
import StackNavigator from './StackNavigator';
import { useColorScheme } from 'react-native-appearance';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import { HeaderBackground } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  const colorScheme = useColorScheme();
  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: 125,
        },
        labelStyle: {
          fontSize: 12,
        },
        indicatorStyle: {
          backgroundColor: 'green',
        },
      }}
    >
      <Tab.Screen
        name="TOP"
        component={HomeScreen}
        initialParams={{ category: null }}
      />
      <Tab.Screen
        name="新型"
        component={HomeScreen}
        initialParams={{ category: '5201f3dc-92dc-444c-acb1-892918981119' }}
      />
      <Tab.Screen
        name="試乗"
        component={HomeScreen}
        initialParams={{ category: '04202150-ef74-4b8d-b042-dc702c8fb276' }}
      />
      <Tab.Screen
        name="モータースポーツ"
        component={HomeScreen}
        initialParams={{ category: 'abd8bf4b-e227-4657-9066-66079a88a6de' }}
      />
      <Tab.Screen
        name="ツーリング"
        component={HomeScreen}
        initialParams={{ category: '36412a02-bc19-4b98-8833-c13d5a25d586' }}
      />
      <Tab.Screen
        name="カスタム"
        component={HomeScreen}
        initialParams={{ category: '94614fc3-6b2f-419f-8d42-d5c0dc0ae799' }}
      />
      <Tab.Screen
        name="原付"
        component={HomeScreen}
        initialParams={{ category: '28d2f2fe-4289-4f28-98e1-6bf446fd043d' }}
      />
      <Tab.Screen
        name="ライディングギア"
        component={HomeScreen}
        initialParams={{ category: 'f91d04b7-dcc1-4ac2-a404-f8efae70aba1' }}
      />
      <Tab.Screen
        name="イベント"
        component={HomeScreen}
        initialParams={{ category: 'c2873457-b299-4930-b025-a69d3a7b133d' }}
      />
      <Tab.Screen
        name="オフロード"
        component={HomeScreen}
        initialParams={{ category: 'f0aa58a9-c53e-4084-9931-4517b8e04264' }}
      />
      <Tab.Screen
        name="試乗会"
        component={HomeScreen}
        initialParams={{ category: '9f3a62f9-a668-48e9-a4d8-cd11a0e5c2d3' }}
      />
      <Tab.Screen
        name="ヘルメット"
        component={HomeScreen}
        initialParams={{ category: '393599f6-6a27-4502-877b-920871b8831e' }}
      />
      <Tab.Screen
        name="通勤"
        component={HomeScreen}
        initialParams={{ category: 'fb602ad3-8d69-4fc7-a60b-3586ce5531ce' }}
      />
      <Tab.Screen
        name="名車"
        component={HomeScreen}
        initialParams={{ category: '6bdcacc1-3ac8-4593-aa1f-2a1606392cb9' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
});
