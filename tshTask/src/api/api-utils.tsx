import {
  FetchProductsProps,
  FetchProductsResponse,
  LoginAccess,
  LoginProps,
  Product,
  PromiseResponseDataProduct,
  PromiseResponseDataUser,
  User,
} from '../types';

const axios = require('axios').default;

const fetchAllProducts = async (
  props: FetchProductsProps,
): Promise<FetchProductsResponse> => {
  console.log(
    'API',
    `https://join-tsh-api-staging.herokuapp.com/product?${
      props.search ? 'search=' + props.search : ''
    }${props.limit ? '&limit=' + props.limit : '&limit=10'}${
      props.page ? '&page=' + props.page : '&page=1'
    }${props.promo ? '&promo=' + props.promo : ''}${
      props.active ? '&active=' + props.active : ''
    }`,
  );
  return axios
    .get(
      `https://join-tsh-api-staging.herokuapp.com/product?${
        props.search ? 'search=' + props.search : ''
      }${props.limit ? '&limit=' + props.limit : '&limit=10'}${
        props.page ? '&page=' + props.page : '&page=1'
      }${props.promo ? '&promo=' + props.promo : ''}${
        props.active ? '&active=' + props.active : ''
      }`,
      {
        headers: {
          accept: 'application/json',
        },
      },
    )
    .then((res: PromiseResponseDataProduct) => {
      return res.data;
    })
    .catch((err: Error) => {
      //TODO add errro handling
      console.log(err);
    });
};

const fetchProduct = async (id: number): Promise<Product> => {
  return axios
    .get(`https://join-tsh-api-staging.herokuapp.com/product/${id}`, {
      headers: {
        accept: 'application/json',
      },
    })
    .then((res: PromiseResponseDataProduct) => {
      return res.data;
    })
    .catch((err: Error) => {
      //TODO add errro handling
      console.log(err);
    });
};

const userLogin = async ({
  username,
  password,
}: LoginProps): Promise<LoginAccess> => {
  return axios
    .post(`https://join-tsh-api-staging.herokuapp.com/user/login`, {
      username: username,
      password: password,
    })
    .then((res: PromiseResponseDataUser) => {
      console.log('RES LOGIN', res.data);
      return res.data;
    })
    .catch((err: Error) => {
      //TODO add errro handling
      console.log(err);
    });
};

const getUserInfo = async (userName: string): Promise<User> => {
  // Staging server does not return user id with login data; id is needed for avatar
  return await axios
    .get(`https://join-tsh-api-staging.herokuapp.com/users`)
    .then(async (res: PromiseResponseDataUser) => {
      const user = res.data.items.find((item) => item.username === userName);
      return user;
    })
    .catch((err: Error) => {
      //TODO add errro handling
      console.log(err);
    });
};
export {fetchAllProducts, fetchProduct, userLogin, getUserInfo};
