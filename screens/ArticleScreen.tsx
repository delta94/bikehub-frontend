import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function ArticleScreen({ route, navigation }: any) {
  const { title } = route.params;
  const { author } = route.params;
  const { imgUrl } = route.params;
  const { summary } = route.params;
  const { url } = route.params;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{summary}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ArticleView', {
              url: url,
            })
          }
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>オリジナルサイトで見る</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonContainer: {
    margin: 10,
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
