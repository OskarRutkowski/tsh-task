import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import {fetchAllProducts} from '../api/api-utils';
import {ProductItem} from '../components/product-item';
import {ProductItemEmpty} from '../components/product-item-empty';
import {ProductStars} from '../components/product-star';
import {colors, globalStyle} from '../styles/styles';
import {Links, MetaData, Product} from '../types';

interface Props {
  meta: MetaData;
  links: Links;
  setPage: (value: number) => void;
}

export const ListFooter: React.FC<Props> = ({meta, links, setPage}: Props) => {
  const pageItems = [];
  const currentPageInt = parseInt(meta.currentPage, 10);
  // TODO nie dziala do konca
  for (let i = currentPageInt - 3; i <= currentPageInt + 3; i++) {
    if (i + 3 === 1) {
      pageItems.push({index: i + 3, sign: (i + 3).toString()});
      pageItems.push({index: i + 4, sign: (i + 4).toString()});
      pageItems.push({index: i + 5, sign: (i + 5).toString()});
      pageItems.push({index: i + 6, sign: (i + 6).toString()});
      pageItems.push({index: i + 7, sign: (i + 7).toString()});
      pageItems.push({index: i + 8, sign: (i + 8).toString()});
      pageItems.push({index: i + 9, sign: '...'});
      break;
    }
    if (i + 3 === 2) {
      pageItems.push({index: i + 2, sign: (i + 2).toString()});
      pageItems.push({index: i + 3, sign: (i + 3).toString()});
      pageItems.push({index: i + 4, sign: (i + 4).toString()});
      pageItems.push({index: i + 5, sign: (i + 5).toString()});
      pageItems.push({index: i + 6, sign: (i + 6).toString()});
      pageItems.push({index: i + 7, sign: (i + 7).toString()});
      pageItems.push({index: i + 8, sign: '...'});
      break;
    }
    if (i + 3 === 3) {
      pageItems.push({index: i + 1, sign: (i + 1).toString()});
      pageItems.push({index: i + 2, sign: (i + 2).toString()});
      pageItems.push({index: i + 3, sign: (i + 3).toString()});
      pageItems.push({index: i + 4, sign: (i + 4).toString()});
      pageItems.push({index: i + 5, sign: (i + 5).toString()});
      pageItems.push({index: i + 6, sign: (i + 6).toString()});
      pageItems.push({index: i + 7, sign: '...'});
      break;
    }
    if (i + 3 === 4) {
      pageItems.push({index: i, sign: i.toString()});
      pageItems.push({index: i + 1, sign: (i + 1).toString()});
      pageItems.push({index: i + 2, sign: (i + 2).toString()});
      pageItems.push({index: i + 3, sign: (i + 3).toString()});
      pageItems.push({index: i + 4, sign: (i + 4).toString()});
      pageItems.push({index: i + 5, sign: (i + 5).toString()});
      pageItems.push({index: i + 6, sign: '...'});
      break;
    }

    // if (i === meta.totalPages) {
    //   pageItems.push({index: i, sign: '...'});
    //   pageItems.push({index: i, sign: (i - 5).toString()});
    //   pageItems.push({index: i, sign: (i - 4).toString()});
    //   pageItems.push({index: i, sign: (i - 3).toString()});
    //   pageItems.push({index: i, sign: (i - 2).toString()});
    //   pageItems.push({index: i, sign: (i - 1).toString()});
    //   pageItems.push({index: i, sign: i.toString()});
    //   break;
    // }
    // if (i === meta.totalPages - 1) {
    //   pageItems.push({index: i, sign: '...'});
    //   pageItems.push({index: i, sign: (i - 4).toString()});
    //   pageItems.push({index: i, sign: (i - 3).toString()});
    //   pageItems.push({index: i, sign: (i - 2).toString()});
    //   pageItems.push({index: i, sign: (i - 1).toString()});
    //   pageItems.push({index: i, sign: i.toString()});
    //   pageItems.push({index: i, sign: (i + 1).toString()});
    //   break;
    // }
    // if (i === meta.totalPages - 2) {
    //   pageItems.push({index: i, sign: '...'});
    //   pageItems.push({index: i, sign: (i - 3).toString()});
    //   pageItems.push({index: i, sign: (i - 2).toString()});
    //   pageItems.push({index: i, sign: (i - 1).toString()});
    //   pageItems.push({index: i, sign: i.toString()});
    //   pageItems.push({index: i, sign: (i + 1).toString()});
    //   pageItems.push({index: i, sign: (i + 2).toString()});
    //   break;
    // }
    if (i === currentPageInt - 3 || i === currentPageInt + 3) {
      pageItems.push({index: i, sign: '...'});
    } else {
      pageItems.push({index: i, sign: i.toString()});
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setPage(1)}
        disabled={links.previous === ''}>
        <Text
          style={[
            globalStyle.productName,
            {
              fontSize: 14,
              paddingRight: 24,
              color: links.previous === '' ? colors.darkGrey : colors.black,
            },
          ]}>
          First
        </Text>
      </TouchableOpacity>
      {pageItems.map((item: {index: number; sign: string}) => (
        <TouchableOpacity
          key={`key-${item.index}`}
          onPress={() => setPage(parseInt(item.sign, 10))}
          disabled={item.sign === '...'}>
          <Text
            style={[
              globalStyle.productName,
              {
                fontSize: 14,
                paddingHorizontal: 8,
                color:
                  item.sign === meta.currentPage ? colors.blue : colors.black,
              },
            ]}>
            {item.sign}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => setPage(meta.totalPages)}
        disabled={links.next === ''}>
        <Text
          style={[
            globalStyle.productName,
            {
              fontSize: 14,
              paddingLeft: 24,
              color: links.next === '' ? colors.darkGrey : colors.black,
            },
          ]}>
          Last
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 68,
    backgroundColor: colors.backgroundGrey,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
