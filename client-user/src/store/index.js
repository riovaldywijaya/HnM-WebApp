import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
