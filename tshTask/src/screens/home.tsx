import React, {useEffect, useState} from 'react';
import {
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
import {HeaderFilter} from '../components/header-filter';
import {ListFooter} from '../components/list-footer';
import {ProductItem} from '../components/product-item';
import {ProductItemEmpty} from '../components/product-item-empty';
import {colors, fonts, globalStyle} from '../styles/styles';
import {Links, MetaData, Product} from '../types';

const barHeight = StatusBar.currentHeight;
const checkIcon = require('../assets/images/check.png');

export const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<MetaData>({} as any);
  const [links, setLinks] = useState<Links>({} as any);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPromo, setIsPromo] = useState<boolean>(false);

  useEffect(() => {
    fetch({});
  }, [isActive, isPromo]);

  const fetch = async ({
    search: search,
    limit,
    page,
  }: {
    search?: string;
    limit?: number;
    page?: number;
  }) => {
    setIsLoading(true);
    const result = await fetchAllProducts({
      search: search,
      limit: limit! | 10,
      page: page! | 1,
      promo: isPromo,
      active: isActive,
    });
    setData(result.items);
    setMeta(result.meta);
    setLinks(result.links);
    setIsLoading(false);
  };

  const setPage = async (value: number) => {
    fetch({limit: 10, page: value});
  };

  const renderItem = ({item}: {item: Product}) => (
    <ProductItem key={`key-${item.id}`} item={item} />
  );

  const renderFooter = () => {
    return (
      <ListFooter
        meta={meta}
        links={links}
        setPage={(value) => setPage(value)}
      />
    );
  };

  const renderEmpty = () => <ProductItemEmpty />;

  const renderHeader = () => (
    <View style={{flex: 0.3, paddingTop: barHeight, marginHorizontal: 24}}>
      <View style={{flex: 0.33}}>
        <View style={{flex: 0.5}}>
          <Text>join.tsh.io</Text>
        </View>
        <View style={{flex: 0.5}}></View>
      </View>
      <View style={{flex: 0.33}}></View>
      <View style={styles.filterContainer}>
        <HeaderFilter
          name="Active"
          stateValue={isActive}
          setStateValue={(value: boolean) => setIsActive(value)}
        />
        <HeaderFilter
          name="Promo"
          stateValue={isPromo}
          setStateValue={(value: boolean) => setIsPromo(value)}
        />
      </View>
    </View>
  );

  const renderList = () =>
    isLoading ? (
      <View
        style={{
          flex: 0.7,
          backgroundColor: colors.backgroundGrey,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={56} color={colors.blue} />
      </View>
    ) : (
      <View style={{flex: 0.7}}>
        <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderList()}
    </View>
  );
};

const styles = StyleSheet.create({
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
  filterContainer: {
    flex: 0.33,
    flexDirection: 'row',
  },
});
