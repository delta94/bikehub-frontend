import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, FlatList, AsyncStorage } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native'
import axios from 'axios';
import Constants from 'expo-constants';
import BikeCard from '../../components/fc/BikeCard'
import AccountLoginCheckNavigator from '../../navigation/fc/AccountLoginCheckNavigator'

export default function HomeFcScreen({ navigation }: { navigation: any }) {
  const API_KEY = Constants.manifest.extra.apiKey;
  const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
  const BIKE_PATH = Constants.manifest.extra.bikeApiPath;
  const FC_SUMMARY_PATH = Constants.manifest.extra.fcSummaryApiPath;
  const [nextPage, setNextPage] = useState(1);
  const [userId, setUserId]: any = useState("");
  const [isNoNext, setIsNoNext] = useState(false);
  const [bikeData, setBikeData]: any = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);


  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('USER_ID');
      // setUserId(value)
      setIsNoNext(false)
      searchBike(value)
      setUserId(value)
    } catch (error) {
      setUserId('')
    }
  }
  useFocusEffect(
    useCallback(() => {
      getUserId()
    }, [])
  );
  const onRefresh = useCallback(() => {
    getUserId()
    setRefreshing(true);
  }, []);


  const searchBike = async (user_id: any) => {

    if (!user_id) {
      setBikeData([])
      return
    }
    if (isNoNext) return
    const query = `?fc__user__id=${user_id}&page=${nextPage}`;
    console.log(BASE_URL + BIKE_PATH + query + `&for_cache_${Math.floor(Math.random() * 100)}=${Math.floor(Math.random() * 100)}`)
    await axios({
      url: BASE_URL + BIKE_PATH + query + `&for_cache_${Math.random()}=${Math.random()}`,
      method: 'GET',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
    })
      .then((response: any) => {
        if (response.data.next) {
          setNextPage(nextPage + 1);
        } else {
          setNextPage(1)
          setIsNoNext(true);
        }

        if (Number(response.status) == 200) {
          const CreateBikes = async () => await Promise.all(response.data.results.map(async (bike: any) => {
            return await getFcSummary(bike.bike_id).then((tmp_fc) => {
              return { bike: bike, fc: tmp_fc }
            })
          }))
          CreateBikes().then((bikes) => { setBikeData(bikes) })
        }
      })
      .catch((e) => {
        setNextPage(1)
        if (e.response) {
          console.log(e.response.status);
          console.log(e.response.data);
        }
      }).finally(() => {
        setRefreshing(false);
      });

  }

  const getFcSummary = async (bikeId: string) => {
    const data = await axios({
      url: BASE_URL + FC_SUMMARY_PATH,
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      data: { bike_id: bikeId, user_id: userId }
    })
      .then((response: any) => {
        if (Number(response.status) == 200) {
          return response.data
        }
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response.status);
          console.log(e.response.data);
        }
        return []
      });
    return data;
  }


  return (
    // <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => {
          const historyLabel = userId ? <Text style={{
            marginTop: 50,
            marginBottom: 20,
            fontSize: 20,
            marginLeft: 10,
          }}>燃費の履歴</Text> : <Text style={{
            marginTop: 50,
            marginBottom: 20,
            fontSize: 15,
            marginLeft: 10,
          }}>アカウント登録するとここに燃費の履歴が出てきます。</Text>;

          return (
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
                  navigation.navigate('燃費検索', {
                    userId: userId,
                  })
                }}

              >燃費の検索</Button>
              <Button
                labelStyle={{
                  fontSize: 20,
                }}
                style={styles.button}
                icon="gas-station"
                mode="outlined"
                onPress={() => {
                  console.log('userId')
                  console.log(userId)
                  if (userId) {
                    navigation.navigate('燃費登録', {
                      userId: userId,
                    })
                  } else {
                    navigation.navigate('Profile')
                  }
                }}

              >燃費の登録</Button>
              {historyLabel}
            </View>
          )
        }
        }
        data={bikeData}
        extraData={bikeData}
        onEndReachedThreshold={0}
        onEndReached={() => {
          searchBike(userId);
        }}
        ListEmptyComponent={() => {
          if (userId) {
            return <Text style={{
              marginBottom: 20,
              marginLeft: 10,
            }}>
              燃費を登録するとここに履歴が表示されます。
            </Text>
          } else {
            return <View></View>
          }

        }}
        renderItem={({ item }: any) => (
          < BikeCard
            bikeName={item.bike.bike_name}
            maxFc={item.fc.fc_max.max ? item.fc.fc_max.max : 0}
            minFc={item.fc.fc_min.min ? item.fc.fc_min.min : 0}
            avgFc={item.fc.fc_avg.avg ? item.fc.fc_avg.avg : 0}
            maker={item.bike.maker}
            onPress={() =>
              navigation.navigate('燃費詳細', {
                bikeName: item.bike.bike_name,
                bikeId: item.bike.bike_id,
                userId: userId,
                isPublicView: false,
                maxFc: item.fc.fc_max.max ? item.fc.fc_max.max : 0,
                minFc: item.fc.fc_min.min ? item.fc.fc_min.min : 0,
                avgFc: item.fc.fc_avg.avg ? item.fc.fc_avg.avg : 0,
                maker: item.bike.maker
              })
            }
          />
        )}
        keyExtractor={(item: any, index: Number) => index.toString()}
      />
    </SafeAreaView>
    // </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    // maxWidth: 500,
    flex: 1,
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
  searchBoxDark: {
    marginTop: 2,
    backgroundColor: '#000000',
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  searchBoxLight: {
    marginTop: 2,
    backgroundColor: '#fff',
    color: '#000000'
  },
});


// Home -> 
      // Seach/ -> show max min ave and user name
            // Detail/ -> show chart and list of fc include user info =>
      // Regist/ -> regist fc after regist move to Detail
// History -> History of fc logined users group by bike and model year show max ave min
      // Edit and regist -> If press History that can choose Edit or regist keep basic infomation.