import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import NewsCard from './components/NewsCard';
import Constants from 'expo-constants';
import axios from 'axios';

type NewsCardProps = {
  title: string;
  author: string;
  imgUrl: string;
  NoImage: string;
  item: any;
};

const BASE_URL = Constants.manifest.extra.newsApiBaseUrl;
const PATH = Constants.manifest.extra.newsApiPath;
const API_KEY = Constants.manifest.extra.apiKey;

export default function App() {
  const [newsData, setNews] = useState([]);
  const [nextUrl, setnextUrl] = useState('');
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response = await axios(BASE_URL + PATH, {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        console.log(response.data.results);
        setNews(response.data.results);
        response.data.results.map((data: any) => {
          // let response = check404(data.news.featured_image);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newsCardList}>
        <FlatList
          data={newsData}
          renderItem={({ item }: any) => (
            <NewsCard
              title={item.title}
              author={item.site.name}
              imgUrl={item.featured_image}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsCardList: {
    width: '100%',
  },
});
