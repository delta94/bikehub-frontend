import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'react-native-appearance';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeFcScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Button
            labelStyle={{
              fontSize: 20,
            }}
            contentStyle={{ borderRadius: 50 }}
            style={styles.button}
            icon="cloud-search-outline"
            mode="outlined"
            onPress={() => {
              navigation.navigate('燃費検索')
            }}

          >燃費の検索</Button>
          <Button
            labelStyle={{
              fontSize: 20,
            }}
            style={styles.button}
            icon="gas-station"
            mode="outlined"
            onPress={() => console.log('Pressed')}
          >燃費の登録</Button>
        </View>
      </SafeAreaView>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 500
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: "center"
  },
  tabDark: {
    backgroundColor: '#000000',
  },
  tabLight: {
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    // position: "r"
  },
  button: {
    flex: 1,
    height: "100%",
    padding: 10,
    margin: 10,
    marginTop: 50,
    marginBottom: 0,
    borderColor: "#c0c0c0",
    borderWidth: 0.5,
  },
});

// Home -> 
      // Seach/ -> show max min ave and user name
            // Detail/ -> show chart and list of fc include user info =>
      // Regist/ -> regist fc after regist move to Detail
// History -> History of fc logined users group by bike and model year show max ave min
      // Edit and regist -> If press History that can choose Edit or regist keep basic infomation.