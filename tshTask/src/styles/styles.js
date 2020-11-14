import {StyleSheet} from 'react-native';

export const colors = {
  blue: '#4460F7',
  yellow: '#F9A52B',
  white: '#FFFFFF',
  whiteGrey: '#F0F1F5',
  lightGrey: '#E0E2EA',
  backgroundGrey: '#F2F2F2',
  grey: '#B9BDCF',
  darkGrey: '#9194A5',
  black: '#1A1B1D',
};

export const fonts = {
  normal: {
    n200: 'NunitoExtraLight',
    n300: 'NunitoLight',
    n400: 'NunitoRegular',
    n600: 'NunitoSemiBold',
    n700: 'NunitoBold',
    n800: 'NunitoExtraBold',
  },
  italic: {
    i200: 'NunitoExtraLightItalic',
    i300: 'NunitoLightItalic',
    i400: 'NunitoRegularItalic',
    i600: 'NunitoSemiBoldItalic',
    i700: 'NunitoBoldItalic',
    i800: 'NunitoExtraBoldItalic',
  },
};

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logButton: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 4,
  },
  logButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.normal.n600,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  productName: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.normal.n600,
    textAlignVertical: 'center',
  },
  productDescription: {
    color: colors.darkGrey,
    fontSize: 14,
    fontFamily: fonts.normal.n600,
    textAlignVertical: 'center',
  },
});
