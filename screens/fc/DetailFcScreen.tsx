import React, { useState, useEffect, useCallback } from 'react';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import { StyleSheet, SafeAreaView, ScrollView, View, FlatList, Text, Dimensions } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { useColorScheme } from 'react-native-appearance';
import BikeCard from '../../components/fc/BikeCard'
// import { ECharts } from "react-native-echarts-wrapper";
import Plotly from 'react-native-plotly';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { List } from 'react-native-paper';
export default function FcDetailScreen({ route, navigation }: any) {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'light' ? '#000000' : '#fff';
    const API_KEY = Constants.manifest.extra.apiKey;
    const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
    const FC_PATH = Constants.manifest.extra.fcReadOnlyApiPath;
    const FC_SUMMARY_PATH = Constants.manifest.extra.fcSummaryApiPath;
    const [nextPage, setNextPage] = useState(1);
    const [isNoNext, setIsNoNext] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [plotlyLayout, setPlotlyLayout]: any = useState({ title: 'My cool chart!', plot_bgcolor: '#000000', paper_bgcolor: "#000000" });
    const [searchQueryPrev, setSearchQueryPrev] = useState('');
    const [fcData, setFcData]: any = useState([]);
    const [fcDataForChart, setFcDataForChart] = useState([0]);
    const { bikeName, maxFc, minFc, avgFc, maker, userId, bikeId, isPublicView } = route.params;

    useEffect(() => {
        fetchFc()
    }, [])
    useEffect(() => {
        let fcs = fcData.map((d) => {
            return d.fc
        })
        const len = fcDataForChart.length
        if (len === 1 && fcDataForChart[0] === 0 && fcs.length !== 0) {
            setFcDataForChart([...fcs])
        } else {
            setFcDataForChart([...fcDataForChart, ...fcs])
        }

    }, [fcData])

    const createChart = (fc) => {
        return (
            <LineChart
                data={{
                    datasets: [
                        {
                            data: fc
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "green",
                    backgroundGradientTo: "#006400",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(256, 256, 256, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(256, 256, 256, ${opacity})`,

                    style: {
                        borderRadius: 1,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#000000"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

        )
    }

    const fetchFc = async () => {
        const query = userId ?
            `?bike=${bikeId}&user=${userId ? userId : ""}&page=${nextPage}` :
            `?bike=${bikeId}&page=${nextPage}`

        if (isNoNext) return
        await axios({
            url: BASE_URL + FC_PATH + query,
            method: 'GET',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response: any) => {
                console.log("response.data.results")
                console.log(response.data.results)

                setFcData([...fcData, ...response.data.results])

                if (response.data.next) {
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

    }
    const editFc = (fc_id: string) => {
        console.log("edit")
        console.log(fc_id)
    }
    const deleteFc = (fc_id: string) => {
        console.log("delete")
        console.log(fc_id)
    }
    const copyFc = (fc_id: string) => {
        console.log("copy")
        console.log(fc_id)
    }

    const buttons = (fc_id: string) => {
        console.log("fc_id")
        console.log(fc_id)
        const data =
            ([
                <List.Item
                    key={`${fc_id}_add`}
                    left={props => <List.Icon  {...props} icon="note-plus-outline" color="seagreen" />}
                    right={props => <List.Icon  {...props} icon="chevron-right" color="green" />}
                    title="このバイクで燃費を再登録" onPress={() => { copyFc(`${fc_id}`) }}
                />,
                <List.Item
                    key={`${fc_id}_edit`}
                    left={props => <List.Icon  {...props} icon="playlist-edit" color="green" />}
                    right={props => <List.Icon  {...props} icon="chevron-right" color="green" />}
                    title="編集" onPress={() => { editFc(`${fc_id}`) }}
                />,
                <List.Item
                    key={`${fc_id}_delete`}
                    left={props => <List.Icon  {...props} icon="delete" color="tomato" />}
                    right={props => <List.Icon  {...props} icon="chevron-right" color="green" />}
                    title="削除" onPress={() => { deleteFc(`${fc_id}`) }}
                />
            ])

        if (!isPublicView) {
            return data
        } else {
            return <Text></Text>
        }
    }
    return (
        <SafeAreaView style={styles.container} >
            <List.Section title="燃費一覧"
            // titleStyle={{ marginTop: 50 }}
            >
                <FlatList
                    ListHeaderComponent={
                        <View>
                            {createChart(fcDataForChart)}
                        </View>
                    }
                    ListEmptyComponent={<Text>データがありません。</Text>}
                    data={fcData}
                    extraData={fcData}
                    onEndReachedThreshold={0}
                    onEndReached={() => {
                        fetchFc()
                    }}
                    renderItem={({ item }: any) => (
                        <List.Accordion
                            // descriptionStyle={{ color: "#000000" }}
                            // style={{ borderColor: "#000000", maxWidth: 500 }}
                            title={`${item.fc} Km/L`}
                            description={`${item.user.disp_name} さん`}
                            left={props => <List.Icon  {...props} icon="gauge" />}>
                            <List.Item titleNumberOfLines={5} title={`コメント: ${item.fc_comment}`} />
                            <List.Item title={`燃料: ${item.fuel_type.fuel}`} />
                            <List.Item title={`高速:${item.high_way_ride}% | 街乗り:${item.city_ride}%`} />
                            <List.Item title={`走行距離:${item.distance ? item.distance : 0}Km / 給油量:${item.gas_amount ? item.gas_amount : 0}L`} />
                            {buttons(item.fc_id)}
                        </List.Accordion>
                    )}
                    keyExtractor={(item: any, index: Number) => index.toString()}
                />
            </List.Section>
        </SafeAreaView >
    )
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
