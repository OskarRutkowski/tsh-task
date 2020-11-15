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
} from 'react-native';
import {fetchAllProducts} from '../api/api-utils';
import {ProductItem} from '../components/product-item';
import {ProductItemEmpty} from '../components/product-item-empty';
import {ProductStars} from '../components/product-star';
import {colors, globalStyle} from '../styles/styles';
import {Product} from '../types';

export const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const result = await fetchAllProducts({limit: 10, page: 1});
      setData(result.items);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <View style={s.container}>
      <View style={{flex: 0.3}}>
        <Text>header</Text>
      </View>
      {isLoading ? (
        <View
          style={{
            flex: 0.6,
            backgroundColor: colors.backgroundGrey,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={56} color={colors.blue} />
        </View>
      ) : (
        <ScrollView style={{flex: 0.6}} contentContainerStyle={{}}>
          <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
            {/** TODO change to FlatList */}
            {/* {data.map((item: Product) => (
              <ProductItem item={item} />
            ))} */}
            <ProductItemEmpty />
          </View>
        </ScrollView>
      )}

      <View style={{flex: 0.1}}>
        <Text>paginacja</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logButton: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4460F7',
    borderRadius: 4,
  },
  logButtonText: {
    color: 'white',
  },
});
