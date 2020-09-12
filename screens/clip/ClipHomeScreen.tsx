import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import NewsCard from '../../components/news/NewsCard';
import Constants from 'expo-constants';
import axios from 'axios';
import { useColorScheme } from 'react-native-appearance';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const BASE_URL = Constants.manifest.extra.newsApiBaseUrl;
const PATH = Constants.manifest.extra.newsApiPath;
const MAIN_TAG_PATH = Constants.manifest.extra.MainTagsPath;
const API_KEY = Constants.manifest.extra.apiKey;
const MainTagsHomeID = Constants.manifest.extra.MainTagsHomeID;

export default function ClipHomeScreen({ route, navigation }: any) {
  const user = useSelector((state) => state.user);
  const { clips } = user;

  const category = '';
  const categoryFilterParm = `&sub_category_tag_map__sub_category_tag__main_category_tag_id=${category}`;
  const colorScheme = useColorScheme();
  const [newsData, setNewsData]: any = useState([]);
  const [nextPage, setnextPage] = useState(1);
  const [isNoNext, setIsNoNext] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;

  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <View style={styles.newsCardList}>
        <FlatList
          ListEmptyComponent={<Text>データがありません。</Text>}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          // contentContainerStyle={styles.listView}
          data={clips}
          extraData={clips}
          onEndReachedThreshold={0.3}
          // onEndReached={() => {
          //   fetchArticles();
          // }}
          renderItem={({ item }: any) => (
            <NewsCard
              title={item.title}
              author={item.author}
              imgUrl={item.featured_image}
              onPress={() => {
                navigation.navigate('記事', {
                  title: item.title,
                  author: item.author,
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
