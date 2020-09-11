import React from 'react';
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import FcStackNavigator from './FcStackNavigator';

let token: any = null;
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('ACCESS_TOKEN');
    return value;
  } catch (error) {
    return null;
  }
}

getToken().then((t) => {
  token = t
})

export default function HomeAccountScreen({ navigation }: { navigation: any }) {
  if (token) {
    return <FcStackNavigator initialRouteName={'燃費登録'} />
  } else {
    navigation.navigate('Profile')
  }

}

