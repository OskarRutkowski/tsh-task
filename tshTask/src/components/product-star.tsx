import {faStar as fullStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as emptyStar} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../styles/styles';

type Star = {
  rating: boolean;
  index: number;
};

type Props = {
  rating: number;
};

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
        <FontAwesomeIcon
          icon={item.rating ? fullStar : emptyStar}
          size={13}
          color={colors.yellow}
          style={styles.icon}
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
    marginHorizontal: 5,
  },
});
