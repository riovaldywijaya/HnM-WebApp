import { FETCH_PRODUCT, FETCH_PRODUCTS } from '../actions/actionType';

const defaultState = { products: [], product: {} };

export default function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case FETCH_PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state;
  }
}
