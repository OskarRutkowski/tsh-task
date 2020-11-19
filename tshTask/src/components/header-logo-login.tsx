import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors, fonts} from '../styles/styles';
import {ScreenNavigationProp, User} from '../types';

const arrowIcon = require('../assets/images/close.png');

interface Props {
  navigation: ScreenNavigationProp<'Home'>;
  logOut: () => void;
  userData: User;
  loading: boolean;
}

export const HeaderLogoLogin: React.FC<Props> = ({
  navigation,
  logOut,
  userData,
  loading,
}: Props) => {
  const [extended, setExtended] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>join.tsh.io</Text>
      </View>
      <View style={styles.avatarContainer}>
        {loading ? (
          <View style={styles.indicatorCon}>
            <ActivityIndicator size={56} color={colors.blue} />
          </View>
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => {
                setExtended(!extended);
              }}>
              {extended ? (
                <View style={styles.imageContainer}>
                  <Image source={arrowIcon} style={styles.image} />
                </View>
              ) : (
                <Image
                  source={{uri: userData.avatar}}
                  style={styles.imageAvatar}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
        {extended && (
          <TouchableOpacity
            style={styles.extendedContainer}
            onPress={() => {
              logOut();
              navigation.navigate('Login');
            }}>
            <Text style={styles.extendedText}>Log out</Text>
          </TouchableOpacity>
        )}
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
    borderRadius: 100,
  },
  avatarContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 46,
    width: 46,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: colors.blue,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    tintColor: colors.blue,
  },
  imageAvatar: {
    height: 48,
    width: 48,
  },
  extendedContainer: {
    width: 88,
    height: 38,
    backgroundColor: colors.white,
    position: 'absolute',
    right: 60,
    zIndex: 1000,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extendedText: {
    color: colors.blue,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.normal.n600,
  },
  indicatorCon: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
