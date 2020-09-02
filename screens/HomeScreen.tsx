import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import NewsCard from '../components/NewsCard';
import Constants from 'expo-constants';
import axios from 'axios';
import { useColorScheme } from 'react-native-appearance';
import { useFocusEffect } from '@react-navigation/native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const BASE_URL = Constants.manifest.extra.newsApiBaseUrl;
const PATH = Constants.manifest.extra.newsApiPath;
const API_KEY = Constants.manifest.extra.apiKey;

export default function HomeScreen({ route, navigation }: any) {
  const category = route.params.category;
  const categoryFilterParm = `&sub_category_tag_map__sub_category_tag__main_category_tag_id=${category}`;
  const colorScheme = useColorScheme();
  const [newsData, setNews]: Array<any> = useState([]);
  const [nextPage, setnextPage] = useState(1);
  const [isNoNext, setIsNoNext] = useState(false);
  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  useFocusEffect(
    React.useCallback(() => {
      fetchArticles();
    }, [])
  );

  const fetchArticles = async () => {
    if (isNoNext) {
      return;
    }

    const requestUrl = () => {
      if (category) {
        return `${BASE_URL}${PATH}?ordering=-created_at${categoryFilterParm}&page=${nextPage}`;
      } else {
        return `${BASE_URL}${PATH}?ordering=-created_at&page=${nextPage}`;
      }
    };
    const response = await axios(requestUrl(), {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response: any) => {
        if (response.data.next) {
          setnextPage(nextPage + 1);
        } else {
          setIsNoNext(true);
        }
        setNews([...newsData, ...response.data.results]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <View style={styles.newsCardList}>
        <FlatList
          contentContainerStyle={styles.listView}
          data={newsData}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            fetchArticles();
          }}
          renderItem={({ item }: any) => (
            <NewsCard
              title={item.title}
              author={item.site.name}
              imgUrl={item.featured_image}
              onPress={() =>
                navigation.navigate('記事', {
                  title: item.title,
                  author: item.site.name,
                  imgUrl: item.featured_image,
                  summary: item.summary,
                  url: item.url,
                })
              }
            />
          )}
          keyExtractor={(item: any, index: Number) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  newsCardList: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  listView: {},
});
