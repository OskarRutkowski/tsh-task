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

export type PromiseResponseDataProduct = {
  data: FetchProductsResponse;
};

export type LoginProps = {
  username: string;
  password: string;
};

export type LoginAccess = {
  username: string;
  expiresIn: string;
  access_token: string;
};

export type User = {
  id: number;
  username: string;
  avatar: string;
};

export type FetchUsersResponse = {
  items: Array<User>;
  meta: MetaData;
  links: Links;
};

export type PromiseResponseDataUser = {
  data: FetchUsersResponse;
};
