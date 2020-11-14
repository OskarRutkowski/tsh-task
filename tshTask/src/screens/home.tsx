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
} from 'react-native';
import {fetchProducts} from '../api/api-utils';
import {ProductStars} from '../components/product-star';
import {colors, globalStyle} from '../styles/styles';
import {Product} from '../types';
export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

export const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [test, setTest] = useState<Product>({} as any);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const result = await fetchProducts({limit: 10, page: 1});
      setData(result.items);
      setTest(result.items[1]);
      setIsLoading(false);
    };
    fetch();
  }, []);
  console.log('DATA', test);
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
        <View style={{flex: 0.6, backgroundColor: colors.backgroundGrey}}>
          <View
            style={{
              height: 400,
              marginHorizontal: 24,
              marginVertical: 24,
              borderRadius: 8,
              backgroundColor: 'white',
            }}>
            <View style={{flex: 0.4}}>
              <Image
                source={{uri: test.image}}
                style={{
                  flex: 1,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
            </View>
            <View style={{flex: 0.6, marginHorizontal: 16}}>
              <View style={{flex: 0.2, justifyContent: 'flex-start'}}>
                <Text style={globalStyle.productName}>{test.name}</Text>
              </View>
              <View style={{flex: 0.2, justifyContent: 'flex-start'}}>
                <Text style={globalStyle.productDescription}>
                  {test.description}
                </Text>
              </View>
              <View style={{flex: 0.2, justifyContent: 'flex-start'}}>
                <ProductStars rating={test.rating} />
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'flex-start',
                  marginVertical: 24,
                }}>
                <TouchableOpacity style={globalStyle.logButton}>
                  <Text style={[{fontSize: 14}, globalStyle.logButtonText]}>
                    Show details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
