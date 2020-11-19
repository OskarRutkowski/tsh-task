import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {fetchAllProducts} from '../api/api-utils';
import {HeaderFilter} from '../components/header-filter';
import {HeaderInput} from '../components/header-input';
import {HeaderLogoLogin} from '../components/header-logo-login';
import {ListFooter} from '../components/list-footer';
import {ProductItem} from '../components/product-item';
import {ProductItemEmpty} from '../components/product-item-empty';
import {useStore} from '../mobx/use-store';
import {colors} from '../styles/styles';
import {
  Links,
  MetaData,
  Product,
  ScreenNavigationProp,
  ScreenRouteProp,
} from '../types';

const barHeight = StatusBar.currentHeight;

export interface Props {
  route: ScreenRouteProp<'Home'>;
  navigation: ScreenNavigationProp<'Home'>;
}

export const HomeScreen: React.FC<Props> = observer(
  ({route, navigation}: Props) => {
    const [data, setData] = useState<Product[]>([]);
    const [meta, setMeta] = useState<MetaData>({} as any);
    const [links, setLinks] = useState<Links>({} as any);
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPromo, setIsPromo] = useState<boolean>(false);
    const LoggingStore = useStore().loggingStore;
    const UserStore = useStore().userStore;

    useEffect(() => {
      fetch({});
      UserStore.fetchUserData(LoggingStore.userName);
    }, [searchFilter, isActive, isPromo]);

    const fetch = async ({limit, page}: {limit?: number; page?: number}) => {
      setIsLoading(true);
      const result = await fetchAllProducts({
        search: searchFilter,
        limit: limit,
        page: page,
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
      <View style={styles.headerContainer}>
        <View style={styles.headerLogoLoginCon}>
          <HeaderLogoLogin
            navigation={navigation}
            logOut={() => LoggingStore.logOut}
            userData={UserStore.userData}
          />
        </View>
        <View style={styles.headerInputCon}>
          <HeaderInput
            searchFilter={searchFilter}
            setSearchFilter={(value) => setSearchFilter(value)}
          />
        </View>
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
        <View style={styles.indicatorCon}>
          <ActivityIndicator size={56} color={colors.blue} />
        </View>
      ) : (
        <View style={styles.flatlistCon}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={data.length !== 0 ? renderFooter : null}
            ListEmptyComponent={renderEmpty}
          />
        </View>
      );

    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderList()}
      </View>
    );
  },
);

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
    flex: 0.333,
    flexDirection: 'row',
  },
  headerContainer: {
    flex: 0.3,
    paddingTop: barHeight,
    marginHorizontal: 24,
  },
  headerLogoLoginCon: {
    flex: 0.333,
    flexDirection: 'row',
  },
  headerInputCon: {
    flex: 0.333,
    justifyContent: 'center',
  },
  indicatorCon: {
    flex: 0.7,
    backgroundColor: colors.backgroundGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistCon: {
    flex: 0.7,
    backgroundColor: colors.backgroundGrey,
  },
});
