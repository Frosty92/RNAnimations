/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Worklets from './src/Worklets';

const App = () => {
  console.log('test 123');
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView>
          <Worklets />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
