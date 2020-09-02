import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import StackNavigator from './StackNavigator';
import { useColorScheme } from 'react-native-appearance';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function AppNavigator() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: { width: 125 },
        }}
      >
        <Tab.Screen
          name="TOP"
          component={StackNavigator}
          initialParams={{ category: null }}
        />
        <Tab.Screen
          name="新型"
          component={StackNavigator}
          initialParams={{ category: '5201f3dc-92dc-444c-acb1-892918981119' }}
        />
        <Tab.Screen
          name="試乗"
          component={StackNavigator}
          initialParams={{ category: '04202150-ef74-4b8d-b042-dc702c8fb276' }}
        />
        <Tab.Screen
          name="モータースポーツ"
          component={StackNavigator}
          initialParams={{ category: 'abd8bf4b-e227-4657-9066-66079a88a6de' }}
        />
        <Tab.Screen
          name="ツーリング"
          component={StackNavigator}
          initialParams={{ category: '36412a02-bc19-4b98-8833-c13d5a25d586' }}
        />
        <Tab.Screen
          name="カスタム"
          component={StackNavigator}
          initialParams={{ category: '94614fc3-6b2f-419f-8d42-d5c0dc0ae799' }}
        />
        <Tab.Screen
          name="原付"
          component={StackNavigator}
          initialParams={{ category: '28d2f2fe-4289-4f28-98e1-6bf446fd043d' }}
        />
        <Tab.Screen
          name="電動バイク"
          component={StackNavigator}
          initialParams={{ category: '1a627848-7e42-4784-a2e0-b7b79a9a0ad0' }}
        />
        <Tab.Screen
          name="オフロード"
          component={StackNavigator}
          initialParams={{ category: 'f0aa58a9-c53e-4084-9931-4517b8e04264' }}
        />
        <Tab.Screen
          name="林道"
          component={StackNavigator}
          initialParams={{ category: 'c667f9b0-9176-42c7-b17e-53202cdfcad0' }}
        />
        <Tab.Screen
          name="ヘルメット"
          component={StackNavigator}
          initialParams={{ category: '393599f6-6a27-4502-877b-920871b8831e' }}
        />
        <Tab.Screen
          name="通勤"
          component={StackNavigator}
          initialParams={{ category: 'fb602ad3-8d69-4fc7-a60b-3586ce5531ce' }}
        />
        <Tab.Screen
          name="ライディングギア"
          component={StackNavigator}
          initialParams={{ category: 'f91d04b7-dcc1-4ac2-a404-f8efae70aba1' }}
        />
        <Tab.Screen
          name="名車"
          component={StackNavigator}
          initialParams={{ category: '6bdcacc1-3ac8-4593-aa1f-2a1606392cb9' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1000,
    margin: 'auto',
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsCardList: {
    width: '100%',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
});
