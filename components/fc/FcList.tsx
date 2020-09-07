import React from 'react'
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

export default function FcList() {
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
  )
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
