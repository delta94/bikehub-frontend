import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import NewsCard from './components/NewsCard';
import data from './data';
import data2 from './data2';

type NewsCardProps = {
  title: string;
  author: string;
  imgUrl: string;
};

export default function App() {
  const [newsData, setNews] = useState(data);
  useEffect(() => {
    const timer = setTimeout(() => {
      setNews(data2);
    }, 5000);

    // return () => clearTimeout(() => {});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newsCardList}>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <NewsCard
              title={item.title}
              author={item.author}
              imgUrl={item.img_url}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
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
