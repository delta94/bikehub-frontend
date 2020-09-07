import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import WebView from '../../components/common/WebView'
import { useColorScheme } from 'react-native-appearance';
import Constants from 'expo-constants';

export default function PasswordResetScreen() {
  const colorScheme = useColorScheme();

  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  const BASE_URL = Constants.manifest.extra.authApiBaseUrl;

  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <WebView url={`${BASE_URL}/web/auth/password_reset/`} />
    </SafeAreaView>
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
