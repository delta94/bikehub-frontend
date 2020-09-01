import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

type NewsCardProps = {
  title: string;
  author: string;
  imgUrl: string;
};

export default function NewsCard({ title, author, imgUrl }: NewsCardProps) {
  const NoImage: string = '../assets/no-img.jpg';
  const [img, setImg] = useState(NoImage);

  const checkImage = (url: string) => {
    Image.getSize(url, (size: Number) => {
      if (size === 1) {
        alert('No image!');
        setImg(NoImage);
      } else {
        alert('No image!');
        setImg(imgUrl);
      }
    });
  };
  checkImage(imgUrl);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Text numberOfLines={3} style={styles.text}>
          {title}
        </Text>
        <Text style={styles.title}>{author}</Text>
      </View>
      <View style={styles.rightContainer}>
        <ImageBackground
          style={styles.backGroundImageContainer}
          source={{ uri: img }}
          blurRadius={2}
          imageStyle={{ opacity: 0.8 }}
        >
          <Image style={styles.imageContainer} source={{ uri: img }} />
        </ImageBackground>
      </View>
    </View>
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
    fontSize: RFPercentage(3),
  },
  title: {
    // fontSize: 14,
    fontSize: RFPercentage(1),
    color: 'grey',
  },
});
