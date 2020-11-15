import {
  FetchProductsProps,
  FetchProductsResponse,
  Product,
  PromiseResponseData,
} from '../types';

const axios = require('axios').default;

const fetchAllProducts = async (
  props: FetchProductsProps,
): Promise<FetchProductsResponse> => {
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
    .then((res: PromiseResponseData) => {
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
    .then((res: PromiseResponseData) => {
      return res.data;
    })
    .catch((err: Error) => {
      //TODO add errro handling
      console.log(err);
    });
};

export {fetchAllProducts, fetchProduct};
