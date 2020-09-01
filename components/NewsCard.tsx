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
        style={styles.backGroundImageContainer}
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
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Text numberOfLines={2} style={styles.text}>
          {title}
        </Text>
        <Text style={styles.title}>{author}</Text>
      </View>
      <View style={styles.rightContainer}>{image}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 125,
    width: '99%',
    borderColor: '#D6D6D6',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexGrow: 0,
  },
  leftContainer: {
    flex: 1,
    padding: 10,
    // fontSize:'20%',
    // fontSize: RFValue(24, 580),
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
    // fontSize: 22,
    fontSize: RFPercentage(2),
  },
  title: {
    // fontSize: 14,
    fontSize: RFPercentage(1),
    color: 'grey',
  },
});
