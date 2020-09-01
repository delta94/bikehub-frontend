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
import { Card, Button } from 'react-native-material-ui';

export default function ArticleScreen({ route, navigation }: any) {
  const { title } = route.params;
  const { author } = route.params;
  const { imgUrl } = route.params;
  const { summary } = route.params;
  const { url } = route.params;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Card>
          <Text>{title}</Text>
          <Text numberOfLines={4}>{summary}</Text>
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
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonContainer: {
    
    margin: 10,
    elevation: 8,
    backgroundColor: '#fff',
    borderColor: '#009688',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#009688',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
