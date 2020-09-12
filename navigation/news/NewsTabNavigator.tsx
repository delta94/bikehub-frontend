import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../../screens/news/ArticleHomeScreen';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();
const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
const TOKEN_PATH = Constants.manifest.extra.tokenPath;
const MAIN_TAG_PATH = Constants.manifest.extra.MainTagsPath;
const API_KEY = Constants.manifest.extra.apiKey;

export default function NewsTabNavigator({ route, navigation }: any) {
  const colorScheme = useColorScheme();
  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  const [expoPushToken, setExpoPushToken]: any = useState('');
  const [mainTags, setMainTags]: any = useState([]);
  const [nextPage, setNextPage]: any = useState(1);
  const [notification, setNotification] = useState(false);
  const notificationListener: any = useRef();
  const responseListener: any = useRef();

  useEffect(() => {
    if (nextPage !== 1) getMainTags()
  }, [nextPage])

  useEffect(() => {
    getMainTags()

    registerForPushNotificationsAsync().then((token: any) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    // When user in app
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification: any) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // When user out side of app
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
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




  const getMainTags = async () => {
    const url = BASE_URL + MAIN_TAG_PATH + `?is_active=true&ordering=ordering_number&page=${nextPage}`
    await axios(url, {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response: any) => {
        const data = response.data.results
        const tabs = data.map((data: any) => {
          return (
            <Tab.Screen
              key={data.main_category_tag_id}
              name={data.name}
              component={HomeScreen}
              initialParams={{ category: data.main_category_tag_id }}
            />
          )
        })

        if (nextPage === 1) {
          setMainTags(tabs)
        } else {
          setMainTags([...mainTags, ...tabs])
        }
        if (response.data.next) {
          setNextPage(nextPage + 1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
      {mainTags}
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

const tokenRegistration = async (token: any) => {
  await axios({
    url: BASE_URL + TOKEN_PATH,
    method: 'POST',
    headers: {
      Authorization: API_KEY,
      'Content-Type': 'application/json',
    },
    data: { token: token }
  })
}

async function registerForPushNotificationsAsync() {
  try {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      tokenRegistration(token)
      // console.log(token);
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
  } catch (error) {
    alert(error);
  }
}
