import { FETCH_PRODUCT, FETCH_PRODUCTS } from './actionType';

export const fetchProductsAction = (payload) => {
  return {
    type: FETCH_PRODUCTS,
    payload,
  };
};

export const fetchProductAction = (payload) => {
  return {
    type: FETCH_PRODUCT,
    payload,
  };
};

const baseUrl = 'http://localhost:3000';
// const baseUrl = 'https://p3-gc1-server.riovaldywijaya.xyz';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/pub/products`);
      if (!response.ok) throw new Error('Something wrong!');
      const data = await response.json();
      const action = fetchProductsAction(data);
      dispatch(action);
      console.log(data, '<<<<<<<<<');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/pub/products/${id}`);
      if (!response.ok) throw new Error('Something wrong!');
      const data = await response.json();
      const action = fetchProductAction(data);
      dispatch(action);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
