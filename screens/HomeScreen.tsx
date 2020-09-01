import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import NewsCard from '../components/NewsCard';
import Constants from 'expo-constants';
import axios from 'axios';
import { useColorScheme } from 'react-native-appearance';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

type NewsCardProps = {
  title: string;
  author: string;
  imgUrl: string;
  NoImage: string;
  onPress: any;
  navigation: any;
  item: any;
};

const BASE_URL = Constants.manifest.extra.newsApiBaseUrl;
const PATH = Constants.manifest.extra.newsApiPath;
const API_KEY = Constants.manifest.extra.apiKey;

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const [newsData, setNews]: Array<any> = useState([]);
  const [nextPage, setnextPage] = useState(1);
  const [isNoNext, setIsNoNext] = useState(false);
  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchMore = useCallback(() => {
    console.log('test');
    setIsNoNext(false);
  }, []);

  const fetchArticles = async () => {
    if (isNoNext) {
      return;
    }
    const response = await axios(
      `${BASE_URL}${PATH}?ordering=-created_at&page=${nextPage}`,
      {
        method: 'GET',
        headers: {
          Authorization: API_KEY,
        },
      }
    )
      .then((response: any) => {
        console.log(response);
        if (response.data.next) {
          setnextPage(nextPage + 1);
        } else {
          setIsNoNext(true);
        }
        setNews([...newsData, ...response.data.results]);
        console.log(isNoNext);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <View style={styles.newsCardList}>
        <FlatList
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
  container: {
    maxWidth: 1000,
    margin: 'auto',
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsCardList: {
    width: '100%',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
});
