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
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type NewsCardProps = {
  bikeName: string;
  maxFc: number;
  minFc: number;
  avgFc: number;
  maker: any;
  onPress: any;
};

export default function BikeCard({
  bikeName,
  maxFc,
  minFc,
  avgFc,
  maker,
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

  return (
    <TouchableOpacity
      style={[styles.itemContainer, themeItemContainer]}
      onPress={onPress}
    >
      <View style={styles.leftContainer}>
        <Text numberOfLines={2} style={[styles.text, themeText]}>
          {bikeName}
        </Text>
        <Text numberOfLines={2} style={[styles.title, themeTitle]}>{`${maker.maker_name_jp} | ${maker.country.country}`}</Text>
        <Text numberOfLines={2} style={[styles.title, themeTitle]}>
          {`Max:${maxFc.toFixed(2)}Km/L | Ave:${avgFc.toFixed(2)}Km/L | Min:${minFc.toFixed(2)}Km/L`}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <MaterialCommunityIcons name="chevron-right" color="green" size={26} />
      </View>
    </TouchableOpacity>
  );
}
parseFloat("123.456").toFixed(2);

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
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
    justifyContent: 'center',
    paddingRight: 20
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
    fontSize: RFPercentage(3),
    fontWeight: "bold"
  },
  title: {
    fontSize: RFPercentage(1.75),
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
