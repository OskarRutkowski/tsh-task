import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../styles/styles';
import {Links, MetaData} from '../types';

interface Props {
  meta: MetaData;
  links: Links;
  setPage: (value: number) => void;
}

export const ListFooter: React.FC<Props> = ({meta, links, setPage}: Props) => {
  let pageItems = [];
  const currentPageInt = parseInt(meta.currentPage, 10);
  const fillArray = (i: number, increase: number, last: number) => {
    let arr = [];
    for (let j = increase; j <= last; j++) {
      arr.push({index: i + j, sign: (i + j).toString()});
    }
    return arr;
  };

  for (let i = currentPageInt - 3; i <= currentPageInt + 3; i++) {
    if (i === -2) {
      pageItems = fillArray(i, 3, 8);
      pageItems.push({index: i + 9, sign: '...'});
      break;
    } else if (i === -1) {
      pageItems = fillArray(i, 2, 7);
      pageItems.push({index: i + 8, sign: '...'});
      break;
    } else if (i === 0) {
      pageItems = fillArray(i, 1, 6);
      pageItems.push({index: i + 7, sign: '...'});
      break;
    } else if (i === 1) {
      pageItems = fillArray(i, 0, 5);
      pageItems.push({index: i + 6, sign: '...'});
      break;
    } else if (i === currentPageInt - 3 || i === currentPageInt + 3) {
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
            styles.first,
            {
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
              styles.inside,
              {
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
            styles.last,
            {
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
  first: {
    color: colors.black,
    fontFamily: fonts.normal.n600,
    textAlignVertical: 'center',
    marginBottom: 8,
    fontSize: 14,
    paddingRight: 24,
  },
  last: {
    color: colors.black,
    fontSize: 14,
    paddingLeft: 24,
    fontFamily: fonts.normal.n600,
    textAlignVertical: 'center',
    marginBottom: 8,
  },
  inside: {
    color: colors.black,
    fontSize: 14,
    paddingHorizontal: 8,
    fontFamily: fonts.normal.n600,
    textAlignVertical: 'center',
    marginBottom: 8,
  },
});
