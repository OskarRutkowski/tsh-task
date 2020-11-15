import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../styles/styles';

const star = require('../assets/images/star.png');
const emptyStar = require('../assets/images/star_border.png');

type Star = {
  rating: boolean;
  index: number;
};

interface Props {
  rating: number;
}

export const ProductStars: React.FC<Props> = ({rating}) => {
  const stars: Star[] = [];
  for (let i = 1; i <= 5; i++) {
    i <= rating
      ? stars.push({rating: true, index: i})
      : stars.push({rating: false, index: i});
  }

  return (
    <View style={styles.container}>
      {stars.map((item: Star) => (
        <Image
          key={`key-${item.index}`}
          source={item.rating ? star : emptyStar}
          style={[
            {tintColor: item.rating ? colors.yellow : colors.darkGrey},
            styles.icon,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    padding: 2,
    marginRight: 10,
  },
});
