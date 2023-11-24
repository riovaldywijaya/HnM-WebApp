// import { FETCH_PRODUCTS, FETCH_PRODUCT, FETCH_CATEGORIES } from '../actions/actionType';

// const initialState = { products: [], product: {}, categories: [] };

// function rootReducer(state = initialState, action) {
//   console.log(action, '<--------------- ini di rootReducer');
//   switch (action.type) {
//     case FETCH_PRODUCTS:
//       return { ...state, products: action.payload };
//     case FETCH_PRODUCT:
//       return { ...state, product: action.payload };
//     case FETCH_CATEGORIES:
//       return { ...state, categories: action.payload };
//     default:
//       return state;
//   }
// }

// export default rootReducer;

import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  productReducer,
  categoryReducer,
});

export default rootReducer;
