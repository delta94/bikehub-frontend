import React, { useState, useEffect, useCallback } from 'react';
import { Searchbar } from 'react-native-paper';

import { StyleSheet, SafeAreaView, ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { useColorScheme } from 'react-native-appearance';
import BikeCard from '../../components/fc/BikeCard'

export default function searchBikeScreen({ navigation, route }: { navigation: any, route: any }) {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'light' ? styles.searchBoxLight : styles.searchBoxDark;
    const textColor = colorScheme === 'light' ? '#000000' : '#fff';
    const API_KEY = Constants.manifest.extra.apiKey;
    const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
    const BIKE_PATH = Constants.manifest.extra.bikeApiPath;
    const FC_SUMMARY_PATH = Constants.manifest.extra.fcSummaryApiPath;
    const [nextPage, setNextPage] = useState(1);
    const [isNoNext, setIsNoNext] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryPrev, setSearchQueryPrev] = useState('');
    const [bikeData, setBikeData]: any = useState([]);
    const { userId } = route.params;
    const onChangeSearch = (query: any) => setSearchQuery(query);
    useEffect(() => {
        setNextPage(1)
        setBikeData([])
        searchBike(1, [])
    }, [])
    const searchBike = async (page: number, bikes: any) => {
        const query = searchQuery ? `?search=${searchQuery}&page=${page}` : `?page=${page}`
        if (isNoNext) return
        await axios({
            url: BASE_URL + BIKE_PATH + query,
            method: 'GET',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response: any) => {
                if (page === 1) {
                    setBikeData([]);
                    setNextPage(2);
                } else if (response.data.next) {
                    setNextPage(nextPage + 1);
                } else {
                    setIsNoNext(true);
                }
                if (Number(response.status) == 200) {
                    response.data.results.map((bike: any) => {
                        getFcSummary(bike.bike_id).then((tmp_fc) => {
                            bikes.push({ bike: bike, fc: tmp_fc })
                            setBikeData(bikes)
                        })
                    })
                }
            })
            .catch((e) => {
                if (e.response) {
                    console.log(e.response.status);
                    console.log(e.response.data);
                }
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
            data: { bike_id: bikeId }
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
        //  <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <SafeAreaView style={styles.container} >
            <View style={{ maxWidth: 500 }}>
                <Searchbar
                    placeholder="入力例:Kawasaki Ninja H2"
                    iconColor={textColor}
                    inputStyle={{ color: textColor, fontSize: 22 }}
                    onChangeText={onChangeSearch}
                    onEndEditing={() => {
                        setNextPage(1)
                        setBikeData([])
                        searchBike(1, [])
                    }}
                    value={searchQuery}
                    style={backgroundColor}
                // autoFocus={true}
                // clearTextOnFocus={true}
                />

                <FlatList
                    data={bikeData}
                    extraData={bikeData}
                    onEndReachedThreshold={0}
                    ListEmptyComponent={<Text>データがありません。</Text>}
                    onEndReached={() => {
                        searchBike(nextPage, bikeData);
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
                                    isPublicView: true,
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
            </View>
        </SafeAreaView>
        // {/* </ScrollView> */}
    )
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // justifyContent: 'center',
        // marginTop: 30,
        marginTop: -2,
        marginBottom: 100,
        // flexDirection: 'row',
        // alignItems: 'center',
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
