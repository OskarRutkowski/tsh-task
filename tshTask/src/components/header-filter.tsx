import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, fonts} from '../styles/styles';

const checkIcon = require('../assets/images/check.png');

interface Props {
  name: string;
  stateValue: boolean;
  setStateValue: (value: boolean) => void;
}

export const HeaderFilter: React.FC<Props> = ({
  name,
  stateValue,
  setStateValue,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setStateValue(!stateValue);
        }}
        style={[
          styles.button,
          {
            backgroundColor: stateValue ? colors.blue : colors.white,
            borderWidth: stateValue ? 0 : 1,
          },
        ]}>
        {stateValue ? <Image source={checkIcon} style={styles.image} /> : null}
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  button: {
    borderColor: colors.lightGrey,
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    tintColor: colors.white,
    width: 12,
    padding: 8,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    paddingLeft: 8,
    color: 'black',
    fontFamily: fonts.normal.n600,
  },
});
