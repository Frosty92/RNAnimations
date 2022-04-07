import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 * If we want to have buttery smooth animations, than
 * all animations should be declared on the UI Thread.
 * The RN native code lives in the JS thread and communicates
 * with the UI thread via an async bridge, where it sends JSON objects.
 * The issue is if the JS thread is really busy, it will not send communicate
 * with the UI thread in the 16ms needed to render smooth animations, resulting in
 * a framedrop.
 *
 * To combat this issue, we use reanimated, which declares all animations on the
 * UI thread
 *
 *
 * Reanimated revolves around the concept animation worklets, these are JS functions
 * that are executed on the UI thread.
 *
 * If you want to animate a component, there are two ways:
 *
 * Wrap the component in <Animated.View> OR use animateMyComponent(<Component>
 *
 * Note that when animating the component on the UI thread, there are
 * two ways it can update: directly or via the UI manager.
 * The method used will depend on the property being updated.
 * If you're animating the width and height, this will involve moving
 * other components so UIManager will be used. BUt if its a transformation, than
 * component can be animated directly. This is important because it can mean that
 * your animations are run on a different schedule
 *
 *
 * Reanimated is using animation worklets: JavaScript functions that run on
  the UI thread to compute animation frames. These worklets
 have exciting properties and ways to communicate to the main JavaScript thread.
 Worklets operate with shared values: animation values that are
 available on both the UI and JS thread.
 * Reanimated provides 6 different APIs to build animations:
 *
 *  TO create values we use useSharedValue and useDerivedValue
 * useSharedValue: which is equvavlent to useState. All animated values
 * use useSharedValues to declare animation values. These values are available
 * both on JS and the UI thread
 * useDerivedValue: useEffect. Derives the animation values based off of other state
 *
 * TO bind to guesture handler we use : useAnimatedGuesterHandler.
 *
 *To actually animate the properties:
 * useAnimatedStyle, useAnimatedProps: (equvavlent to the render func)
 *
 * To apply sideeffects
 * useAnimatedReaction: useEffect
 *
 *
 */

export default function Worklets() {
  return (
    <View style={styles.container}>
      <Text>TEST TEXT</Text>
      <Text>TEST TEXT</Text>
      <Text>TEST TEXT</Text>
      <Text>TEST TEXT</Text>
      <Text>TEST TEXT</Text>
      <TouchableOpacity>
        <Text>CLCIK ME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'red',
  },
});
