import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useColorScheme } from 'react-native-appearance';

type NewsCardProps = {
  title: string;
  author: string;
  imgUrl: string;
  onPress: any;
};

export default function NewsCard({
  title,
  author,
  imgUrl,
  onPress,
}: NewsCardProps) {
  const [isError, setisError] = useState(false);
  const colorScheme = useColorScheme();

  const themeItemContainer =
    colorScheme === 'light'
      ? styles.itemContainerLight
      : styles.itemContainerDark;
  const themeText =
    colorScheme === 'light' ? styles.textLight : styles.textDark;
  const themeTitle =
    colorScheme === 'light' ? styles.titleLight : styles.titleDark;

  const checkImage = (url: string) => {
    try {
      Image.getSize(
        url,
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
  };
  let image;
  if (isError) {
    image = (
      <ImageBackground
        style={[styles.backGroundImageContainer]}
        source={require('../assets/no-img.jpg')}
        blurRadius={2}
        imageStyle={{ opacity: 0.8 }}
      >
        <Image
          style={styles.imageContainer}
          source={require('../assets/no-img.jpg')}
        />
      </ImageBackground>
    );
  } else {
    image = (
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
  useEffect(() => {
    checkImage(imgUrl);
  }, []);

  return (
    <TouchableOpacity
      style={[styles.itemContainer, themeItemContainer]}
      onPress={onPress}
    >
      <View style={styles.leftContainer}>
        <Text numberOfLines={3} style={[styles.text, themeText]}>
          {title}
        </Text>
        <Text style={[styles.title, themeTitle]}>{author}</Text>
      </View>
      <View style={styles.rightContainer}>{image}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 125,
    width: '99%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexGrow: 0,
  },
  itemContainerDark: {
    borderColor: '#fff',
  },
  itemContainerLight: {
    borderColor: '#000000',
  },
  leftContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightContainer: {
    margin: 10,
    width: '40%',
    maxWidth: 300,
  },
  imageContainer: {
    flex: 1,
    height: '95%',
    width: '100%',
    resizeMode: 'contain',
  },
  backGroundImageContainer: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: RFPercentage(2.75),
  },
  title: {
    fontSize: RFPercentage(1.5),
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
