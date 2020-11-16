import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../styles/styles';

const lupa = require('../assets/images/search.png');

interface Props {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

export const HeaderInput: React.FC<Props> = ({
  searchFilter,
  setSearchFilter,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.8}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TextInput
            onChangeText={(text) => setSearchFilter(text)}
            value={searchFilter}
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor={colors.black}
            style={styles.input}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.iconContainer}>
        <Image source={lupa} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    maxHeight: 48,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  icon: {
    flex: 1,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  iconContainer: {
    height: 24,
    width: 24,
    flex: 0.2,
  },
});
