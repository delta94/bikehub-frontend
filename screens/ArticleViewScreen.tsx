import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useColorScheme } from 'react-native-appearance';

export default function ArticleViewScreen({ route, navigation }: any) {
  const { url } = route.params;
  const colorScheme = useColorScheme();

  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <WebView source={{ uri: url }} />
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
