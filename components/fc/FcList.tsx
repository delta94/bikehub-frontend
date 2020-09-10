import React from 'react'
import {
  StyleSheet,
  FlatList
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BikeCard from './BikeCard'

type NewsCardProps = {
  bikeData: any;
  isPublicView: boolean;
  searchFc: void;
  onPress: any;
};

export default function FcList({ bikeData, isPublicView, searchFc }) {
  return (
    <FlatList
      data={bikeData}
      extraData={bikeData}
      onEndReachedThreshold={0}
      onEndReached={() => {
        searchFc(nextPage, bikeData);
      }}
      renderItem={({ item }: any) => (
        < BikeCard
          bikeName={item.bike.bike_name}
          maxFc={item.fc.fc_max.max ? item.fc.fc_max.max : 0}
          minFc={item.fc.fc_min.min ? item.fc.fc_min.min : 0}
          avgFc={item.fc.fc_avg.avg ? item.fc.fc_avg.avg : 0}
          maker={item.bike.maker}
          onPress={() =>
            navigation.navigate('燃費詳細', {
              bikeName: item.bike.bike_name,
              bikeId: item.bike.bike_id,
              isPublicView: isPublicView,
              maxFc: item.fc.fc_max.max ? item.fc.fc_max.max : 0,
              minFc: item.fc.fc_min.min ? item.fc.fc_min.min : 0,
              avgFc: item.fc.fc_avg.avg ? item.fc.fc_avg.avg : 0,
              maker: item.bike.maker
            })
          }
        />
      )}
      keyExtractor={(item: any, index: Number) => index.toString()}
    />
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
