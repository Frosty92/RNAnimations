import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {withSpring} from 'react-native-reanimated/src/reanimated2/animation';
import {mix} from 'react-native-redash';
import Button from '../common/Button';

const CARD_WIDTH = 250;
const CARD_HEIGHT = 100;

interface CardProps {
  transition: any;
  index: number;
  color: string;
}

const {width} = Dimensions.get('window');
const origin = -(width / 2 - 8 * 2);
console.log('origin is', width, origin);

function Card({transition, index, color}: CardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6],
    );
    // const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);
    return {
      transform: [
        {translateX: origin},
        {rotate: `${rotate}rad`},
        {translateX: -origin},
        {rotate: `${rotate}rad`},
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.box, {backgroundColor: color}]} />
    </Animated.View>
  );
}

export default function Transition() {
  const [toggle, setToggle] = React.useState(false);

  const toggledState = useSharedValue(false);
  React.useEffect(() => {
    toggledState.value = toggle;
  }, [toggledState, toggle]);
  const transition = useDerivedValue(() => {
    return withSpring(toggledState.value);
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Card transition={transition} index={0} color={'blue'} />
        <Card transition={transition} index={1} color={'red'} />
        <Card transition={transition} index={2} color={'green'} />
      </View>
      <Button onPress={() => setToggle(!toggle)}>
        {toggle ? 'Reset' : 'Toggle'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'red',
    alignSelf: 'center',
    position: 'absolute',
  },
  boxContainer: {
    backgroundColor: 'black',
    flex: 1,
    alignSelf: 'center',
  },
  btnStyle: {
    padding: 15,
    backgroundColor: 'lightblue',
    borderRadius: 15,
    width: 300,
    alignSelf: 'center',
  },
  btnTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});
