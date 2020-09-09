import React from 'react';
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import AccountStackNavigator from './AccountStackNavigator';

let token: any = null;
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log(value)
    return value;
  } catch (error) {
    return null;
  }
}

getToken().then((t) => {
  token = t
})

export default function HomeAccountScreen() {
  if (token) {
    return <AccountStackNavigator initialRouteName={'ユーザー詳細'} />
  } else {
    return <AccountStackNavigator initialRouteName={'ログイン'} />
  }

}

