import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../styles/styles';

export const HeaderLogoLogin: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>join.tsh.io</Text>
      </View>
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatar}></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontFamily: fonts.normal.n600,
    color: colors.black,
    textAlignVertical: 'center',
  },
  avatar: {
    height: 48,
    width: 48,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  avatarContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
