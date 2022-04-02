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

/**
 * When you install Reanimated and ReactNative Gesture Handler,
 * if the code doesnt work, do the following:
 *
 * 1.clear cache
 * 2.remove node_modules
 * 3.yarn add
 * 4.npm install
 *
 *
 */

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
