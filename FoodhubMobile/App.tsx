/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {DashboardScreen} from './src/screens/DashboardScreen';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <DashboardScreen />
    </Provider>
  );
}

export default App;
