import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type ScreenType = 'Login' | 'Home';

export type ScreenNavigationProp<Type extends ScreenType> = StackNavigationProp<
  RootStackParamList,
  Type
>;

export type ScreenRouteProp<Type extends ScreenType> = RouteProp<
  RootStackParamList,
  Type
>;

export type FetchProductsProps = {
  search?: string;
  limit?: number;
  page?: number;
  promo?: boolean;
  active?: boolean;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  rating: number;
  image: string;
  promo: boolean;
  active: boolean;
};

export type MetaData = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: string;
  totalPages: number;
  currentPage: string;
};

export type Links = {
  first: string;
  previous: string;
  next: string;
  last: string;
};

export type FetchProductsResponse = {
  items: Array<Product>;
  meta: MetaData;
  links: Links;
};

export type PromiseResponseData = {
  data: FetchProductsResponse;
};
