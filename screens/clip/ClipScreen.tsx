import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { AdMobBanner } from 'expo-ads-admob';
// await setTestDeviceIDAsync('EMULATOR');

export default function ClipScreen({ route, navigation }: any) {
  const { title, author, imgUrl, summary, url } = route.params;
  const [isError, setisError] = useState(false);
  const colorScheme = useColorScheme();
  const themeItemContainer =
    colorScheme === 'light' ? styles.containerLight : styles.containerDark;
  const themeText =
    colorScheme === 'light' ? styles.textLight : styles.textDark;
  const themeTitle =
    colorScheme === 'light' ? styles.titleLight : styles.titleDark;
  const themeButton =
    colorScheme === 'light'
      ? styles.appButtonContainerLight
      : styles.appButtonContainerDark;
  const themeButtonText =
    colorScheme === 'light'
      ? styles.appButtonTextLight
      : styles.appButtonTextDark;

  let imangeContaner;

  try {
    Image.getSize(
      imgUrl,
      (size: Number) => {
        if (size === 1) {
          setisError(true);
        }
      },
      (error) => {
        setisError(true);
      }
    );
  } catch (error) {
    setisError(true);
  }

  if (!isError) {
    imangeContaner = (
      <ImageBackground
        style={styles.backGroundImageContainer}
        source={{ uri: imgUrl }}
        blurRadius={2}
        imageStyle={{ opacity: 0.8 }}
      >
        <Image style={styles.imageContainer} source={{ uri: imgUrl }} />
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView style={[styles.scrollView, themeItemContainer]}>
      <ScrollView>
        <View style={[styles.container, themeItemContainer]}>
          <Text style={[styles.title, themeTitle]}>{title}</Text>
          <Text style={[styles.author, themeTitle]}>{author}</Text>
          {imangeContaner}
          <Text style={[styles.text, themeText]} numberOfLines={4}>
            {summary}
          </Text>
          <Text style={[styles.textSmall, themeText]}>
            ※続きは最下部の-オリジナルサイトで見る-から閲覧できます
          </Text>
          <Text style={[styles.adText, themeText]} numberOfLines={4}>
            広告
          </Text>
          <AdMobBanner
            style={[styles.ad]}
            bannerSize="mediumRectangle"
            // adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
            adUnitID="ca-app-pub-8220669417943263~9822025915"
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('オリジナルサイト', {
                url: url,
              })
            }
            style={[styles.appButtonContainer, themeButton]}
          >
            <Text style={[styles.appButtonText, themeButtonText]}>
              オリジナルサイトで見る
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  adText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  ad: {
    marginBottom: 30,
  },
  scrollView: {
    height: '100%',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  textSmall: {
    fontSize: 15,
    textAlign: 'right',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 5,
    marginBottom: 10,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
  },
  appButtonContainer: {
    margin: 10,
    marginTop: 20,
    marginBottom: 50,
    elevation: 8,
    backgroundColor: '#fff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonContainerDark: {
    backgroundColor: '#000000',
    borderColor: '#fff',
  },
  appButtonContainerLight: {
    backgroundColor: '#fff',
    borderColor: '#000000',
  },
  appButtonTextDark: {
    color: '#fff',
  },
  appButtonTextLight: {
    color: '#000000',
  },
  imageContainer: {
    flex: 1,
    height: '95%',
    width: '100%',
    margin: 'auto',
    resizeMode: 'contain',
  },
  backGroundImageContainer: {
    width: '100%',
    height: 225,
    flexDirection: 'row',
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLight: {
    color: '#000000',
  },
  textDark: {
    color: '#fff',
  },
  titleLight: {
    color: '#000000',
  },
  titleDark: {
    color: '#fff',
  },
});
