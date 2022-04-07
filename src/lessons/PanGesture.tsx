import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';

import {withDecay} from 'react-native-reanimated/src/reanimated2/animation';
import {Dimensions} from 'react-native';

const CARD_WIDTH = 250;
const CARD_HEIGHT = 100;

export default function PanGesture() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (evt, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (evt, ctx) => {
      translateX.value = clamp(ctx.offsetX + evt.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + evt.translationY, 0, boundY);
    },
    onEnd: evt => {
      translateX.value = withDecay({
        velocity: evt.velocityX,
        clamp: [0, width - CARD_WIDTH],
      });
      translateY.value = withDecay({
        velocity: evt.velocityY,
        clamp: [0, boundY],
      });
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={animatedStyles}>
        <View style={styles.box} />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  box: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'blue',
  },
});
