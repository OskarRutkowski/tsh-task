import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {globalStyle} from '../styles/styles';

const empty = require('../assets/images/empty.png');

export const ProductItemEmpty: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={empty} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[globalStyle.productName, {fontSize: 18}]}>
          Ooops... It's empty here
        </Text>
        <Text style={[globalStyle.productDescription, {fontSize: 14}]}>
          There are no products on the list
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 344,
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  image: {
    height: 45,
    width: 36,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
