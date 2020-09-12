import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import NewsCard from '../../components/news/NewsCard';
import { useColorScheme } from 'react-native-appearance';
import { useSelector } from 'react-redux';

export default function ClipHomeScreen({ route, navigation }: any) {
  const user = useSelector((state) => state.user);
  const { clips } = user;
  const colorScheme = useColorScheme();
  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';

  return (
    <SafeAreaView style={[styles.container, themeItemContainer]}>
      <View style={styles.newsCardList}>
        <FlatList
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                flexGrow: 0,
                marginTop: 50,
                marginBottom: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  marginBottom: 20,
                  fontSize: 22.5,
                  color: textColor,
                }}
              >
                お気に入りの記事はニュース記事の右上アイコンから登録できます！
              </Text>
              <View
                style={{
                  height: 500,
                  width: '99%',
                  flexGrow: 0,
                  flex: 1,
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    height: '95%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/how_to_clip.gif')}
                />
              </View>
            </View>
          }
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
