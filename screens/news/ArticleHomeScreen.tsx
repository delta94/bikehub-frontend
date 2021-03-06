import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import NewsCard from '../../components/news/NewsCard';
import Constants from 'expo-constants';
import axios from 'axios';
import { useColorScheme } from 'react-native-appearance';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/common/Loading';

const BASE_URL = Constants.manifest.extra.newsApiBaseUrl;
const PATH = Constants.manifest.extra.newsApiPath;
const MAIN_TAG_PATH = Constants.manifest.extra.MainTagsPath;
const API_KEY = Constants.manifest.extra.apiKey;
const MainTagsHomeID = Constants.manifest.extra.MainTagsHomeID;

export default function HomeScreen({ route, navigation }: any) {
  const category = route.params.category;
  const categoryFilterParm = `&sub_category_tag_map__sub_category_tag__main_category_tag_id=${category}`;
  const colorScheme = useColorScheme();
  const [newsData, setNewsData]: any = useState([]);
  const [nextPage, setnextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isNoNext, setIsNoNext] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  useFocusEffect(
    useCallback(() => {
      fetchArticles();
    }, [])
  );
  useEffect(() => {
    if (refreshing) {
      fetchArticles().then(() => {
        setRefreshing(false);
      });
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const MainTagCounter = async () => {
    let c = category ? category : MainTagsHomeID;
    await axios(BASE_URL + MAIN_TAG_PATH + c + '/', {
      method: 'PATCH',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response: any) => {})
      .catch((e) => {
        console.log(e.response);
      });
  };

  const fetchArticles = async () => {
    setLoading(true);
    if (isNoNext && !refreshing) {
      return;
    }
    const requestUrl = () => {
      if (refreshing && category) {
        return `${BASE_URL}${PATH}?ordering=-created_at${categoryFilterParm}&page=1`;
      } else if (refreshing && !category) {
        return `${BASE_URL}${PATH}?ordering=-created_at&page=1`;
      } else if (category) {
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
        if (response.data.next && !refreshing) {
          setnextPage(nextPage + 1);
        } else {
          setIsNoNext(true);
        }

        if (refreshing) {
          setNewsData([...response.data.results]);
          setRefreshing(false);
          setIsNoNext(false);
          // alert('refleshed');
        } else {
          setNewsData([...newsData, ...response.data.results]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <View style={styles.newsCardList}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          // contentContainerStyle={styles.listView}
          data={newsData}
          extraData={newsData}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            fetchArticles();
          }}
          renderItem={({ item }: any) => (
            <NewsCard
              title={item.title}
              author={item.site.name}
              imgUrl={item.featured_image}
              onPress={() => {
                MainTagCounter();
                navigation.navigate('記事', {
                  title: item.title,
                  author: item.site.name,
                  imgUrl: item.featured_image,
                  summary: item.summary,
                  url: item.url,
                });
              }}
            />
          )}
          keyExtractor={(item: any, index: Number) => index.toString()}
        />
      </View>
      {loading && <Loading />}
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
});
