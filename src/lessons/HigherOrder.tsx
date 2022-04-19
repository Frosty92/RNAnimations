import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {withRepeat} from 'react-native-reanimated/src/reanimated2/animation/repeat';
import {AnimationObject} from 'react-native-reanimated/src/reanimated2/commonTypes';
import {withPause} from 'react-native-redash';
import Button from '../common/Button';

interface BubbleProps {
  start: number;
  end: number;
  progress: Animated.SharedValue<number>;
}
const Bubble = ({start, end, progress}: BubbleProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [start, end],
      [0.5, 1],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      progress.value,
      [start, end],
      [1, 1.5],
      Extrapolate.CLAMP,
    );

    return {opacity, transform: [{scale}]};
  });

  return (
    <Animated.View style={animatedStyles}>
      <View style={styles.bubble} />
    </Animated.View>
  );
};

interface ActivityIndicatorProps {
  progress: Animated.SharedValue<number>;
}
const ActivityIndicator = ({progress}: ActivityIndicatorProps) => {
  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;
  //delta is: 0.33

  //start for 1st: 0,  2nd: 0.33, 3rd: 0.66
  //end for 1st: 0.33, 2nd: 0.66, 3rd: 1

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {bubbles.map(i => {
          const start = i * delta;
          const end = start + delta;
          return <Bubble key={i} start={start} end={end} progress={progress} />;
        })}
      </View>
    </View>
  );
};

export default function HigherOrder() {
  const [play, setPlay] = React.useState(false);
  const progress = useSharedValue<AnimationObject | number>(0);
  const paused = useSharedValue<boolean>(!play);

  const onPress = () => {
    paused.value = !paused.value;
    if (progress.value === 0) {
      progress.value = withPause(
        withRepeat(
          withTiming(1, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
        paused,
      );
    }

    setPlay(prev => !prev);
  };
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator progress={progress} />
      <Button onPress={onPress}>{play ? 'Pause' : 'Play'}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'lightgray',
  },
  bubble: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 25,
  },
});
