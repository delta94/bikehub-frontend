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
import NewsCard from '../components/NewsCard';
import Constants from 'expo-constants';
import axios from 'axios';
import { useColorScheme } from 'react-native-appearance';
import { useFocusEffect } from '@react-navigation/native';

const BASE_URL = Constants.manifest.extra.newsApiBaseUrl;
const PATH = Constants.manifest.extra.newsApiPath;
const API_KEY = Constants.manifest.extra.apiKey;

export default function HomeScreen({ route, navigation }: any) {
  const category = route.params.category;
  const categoryFilterParm = `&sub_category_tag_map__sub_category_tag__main_category_tag_id=${category}`;
  const colorScheme = useColorScheme();
  const [newsData, setNewsData] = useState([]);
  const [nextPage, setnextPage] = useState(1);
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
    fetchArticles().then(() => {
      setRefreshing(false);
    });
  }, []);

  const fetchArticles = async () => {
    if (isNoNext) {
      return;
    }
    console.log(
      '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
    );

    if (refreshing) {
      console.log(
        '++++++++++++++++++++++++++++refreshing++++++++++++++++++++++++++++++++++++'
      );
      setNewsData([]);
      setRefreshing(false);

      setnextPage(1);
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
          let r = response.data.results.map((a) => {
            return a.title;
          });
          console.log(requestUrl());
          console.log(r);

          // console.log(response.data);
          setnextPage(nextPage + 1);
        } else {
          setIsNoNext(true);
        }

        if (refreshing) {
          setNewsData(response.data.results);
          alert('aaass');
        } else {
          setNewsData([...newsData, ...response.data.results]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <View style={styles.newsCardList}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listView}
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
