import { FETCH_CATEGORIES, FETCH_CATEGORY } from '../actions/actionType';

const initialState = { categories: [], category: {} };

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case FETCH_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
}

export default categoryReducer;
