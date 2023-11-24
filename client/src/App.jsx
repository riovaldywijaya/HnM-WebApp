/* eslint-disable no-unused-vars */

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';
import store from '../store';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
