import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator({ route, navigation }: any) {
  const colorScheme = useColorScheme();
  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    // When user in app
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // When user out side of app
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
        const data: any = response.notification.request.content.data.body;
        navigation.navigate('記事', {
          title: data.title,
          author: data.author,
          imgUrl: data.imgUrl,
          summary: data.summary,
          url: data.url,
        });
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: 125,
          height: 50,
        },
        labelStyle: {
          fontSize: 15,
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
