import React, { useState, useEffect, useCallback } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { useColorScheme } from 'react-native-appearance';
// import { ECharts } from "react-native-echarts-wrapper";
import { LineChart } from 'react-native-chart-kit';
import { List } from 'react-native-paper';
import Loading from '../../components/common/Loading';

let token: any = null;
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('ACCESS_TOKEN');
    return value;
  } catch (error) {
    return null;
  }
};

export default function FcDetailScreen({ route, navigation }: any) {
  const colorScheme = useColorScheme();
  const API_KEY = Constants.manifest.extra.apiKey;
  const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
  const FC_READ_ONLY_PATH = Constants.manifest.extra.fcReadOnlyApiPath;
  const FC_PATH = Constants.manifest.extra.fcApiPath;
  const [nextPage, setNextPage] = useState(1);
  const [isNoNext, setIsNoNext] = useState(false);
  const [token, setToken]: any = useState(false);
  const [fcData, setFcData]: any = useState([]);
  const [fcDataForChart, setFcDataForChart] = useState([0]);
  const { bikeName, userId, bikeId, isPublicView } = route.params;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFc(false, '');
    getToken().then((t) => {
      setToken(t);
      if (!t) {
        navigation.navigate('Profile');
      }
    });
  }, []);

  useEffect(() => {
    let fcs = fcData.map((d: any) => {
      return d.fc;
    });
    const len = fcDataForChart.length;
    if (len === 1 && fcDataForChart[0] === 0 && fcs.length !== 0) {
      setFcDataForChart([...fcs]);
    } else {
      setFcDataForChart([...fcDataForChart, ...fcs]);
    }
  }, [fcData]);

  const createChart = (fc: any) => {
    return (
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: fc,
              // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              // strokeWidth: 2 // optional
            },
          ],
          // legend: ["Rainy Days", "Sunny Days", "Snowy Days"]
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: 'green',
          backgroundGradientTo: '#006400',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(256, 256, 256, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(256, 256, 256, ${opacity})`,

          style: {
            borderRadius: 1,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#000000',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    );
  };

  const fetchFc = async (isDelete: boolean, fc_id: string) => {
    setLoading(true);
    let method: any = 'GET';
    const query = () => {
      if (isDelete) {
        method = 'DELETE';
        return `${fc_id}`;
      } else {
        return isPublicView
          ? `?bike=${bikeId}&page=${nextPage}`
          : `?bike=${bikeId}&user=${userId ? userId : ''}&page=${nextPage}`;
      }
    };
    const headers = () => {
      if (isDelete) {
        return {
          Authorization: `Bearer  ${token}`,
          'Content-Type': 'application/json',
        };
      } else {
        return {
          Authorization: API_KEY,
          'Content-Type': 'application/json',
        };
      }
    };
    if (isNoNext && !isDelete) {
      setLoading(false);
      return;
    }
    const request_uri = isDelete ? FC_PATH : FC_READ_ONLY_PATH;
    console.log(BASE_URL + request_uri + query());
    // console.log(BASE_URL + request_uri + query())
    await axios({
      url: BASE_URL + request_uri + query(),
      method: method,
      headers: headers(),
    })
      .then((response: any) => {
        setFcData([...fcData, ...response.data.results]);
        console.log([...fcData, ...response.data.results]);
        if (response.data.next && !isDelete) {
          setNextPage(nextPage + 1);
        } else {
          setIsNoNext(true);
        }
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response.status);
          console.log(e.response.data);
        }
      });
    setLoading(false);
  };
  const editFc = (fc_id: string) => {
    navigation.navigate('燃費入力', {
      fcId: fc_id,
      bikeName: bikeName,
      bikeId: bikeId,
      userId: userId,
      isEdit: true,
      receivedFcData: fcData.filter((i: any) => {
        return i.fc_id === fc_id;
      }),
    });
  };
  const copyFc = (fc_id: string) => {
    navigation.navigate('燃費入力', {
      fcId: fc_id,
      bikeName: bikeName,
      bikeId: bikeId,
      userId: userId,
      isEdit: false,
      receivedFcData: fcData.filter((i: any) => {
        return i.fc_id === fc_id;
      }),
    });
  };
  const deleteFc = (fc_id: string) => {
    Alert.alert('確認', '本当に燃費を削除しますか？', [
      { text: '戻る' },
      {
        text: '削除する',
        onPress: () => {
          fetchFc(true, fc_id).then(() => {
            setFcData(
              fcData.filter((i: any) => {
                return i.fc_id !== fc_id;
              })
            );
          });
        },
      },
    ]);
  };
  const buttons = (fc_id: string) => {
    const data = [
      <List.Item
        key={`${fc_id}_add`}
        left={(props) => (
          <List.Icon {...props} icon="note-plus-outline" color="seagreen" />
        )}
        right={(props) => (
          <List.Icon {...props} icon="chevron-right" color="green" />
        )}
        title="このバイクで燃費を再登録"
        onPress={() => {
          copyFc(`${fc_id}`);
        }}
      />,
      <List.Item
        key={`${fc_id}_edit`}
        left={(props) => (
          <List.Icon {...props} icon="playlist-edit" color="green" />
        )}
        right={(props) => (
          <List.Icon {...props} icon="chevron-right" color="green" />
        )}
        title="編集"
        onPress={() => {
          editFc(`${fc_id}`);
        }}
      />,
      <List.Item
        key={`${fc_id}_delete`}
        left={(props) => <List.Icon {...props} icon="delete" color="tomato" />}
        right={(props) => (
          <List.Icon {...props} icon="chevron-right" color="green" />
        )}
        title="削除"
        onPress={() => {
          deleteFc(`${fc_id}`);
        }}
      />,
    ];

    if (!isPublicView) {
      return data;
    } else {
      return <Text></Text>;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <List.AccordionGroup
      // titleStyle={{ marginTop: 50 }}
      >
        <FlatList
          ListHeaderComponent={<View>{createChart(fcDataForChart)}</View>}
          ListEmptyComponent={<Text>データがありません。</Text>}
          data={fcData}
          extraData={fcData}
          onEndReachedThreshold={0}
          onEndReached={() => {
            fetchFc(false, '');
          }}
          renderItem={({ item }: any) => (
            <List.Accordion
              // descriptionStyle={{ color: "#000000" }}
              // style={{ borderColor: "#000000", maxWidth: 500 }}
              id={`${item.fc_id}`}
              title={`${item.fc} Km/L | ${item.model_year}年モデル`}
              description={`${item.user.disp_name} さん`}
              left={(props) => <List.Icon {...props} icon="gauge" />}
            >
              <List.Item
                titleNumberOfLines={5}
                title={`コメント: ${item.fc_comment}`}
              />
              <List.Item title={`燃料: ${item.fuel_type.fuel}`} />
              <List.Item
                title={`高速:${item.high_way_ride}% | 街乗り:${item.city_ride}%`}
              />
              <List.Item
                title={`走行距離:${
                  item.distance ? item.distance : 0
                }Km / 給油量:${item.gas_amount ? item.gas_amount : 0}L`}
              />
              {buttons(item.fc_id)}
            </List.Accordion>
          )}
          keyExtractor={(item: any, index: Number) => index.toString()}
        />
      </List.AccordionGroup>
      {loading && <Loading />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginBottom: 30,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
});
