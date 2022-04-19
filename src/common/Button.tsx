import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

interface Props {
  onPress: () => void;
  children: string;
}

export default function Button({onPress, children}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
      <Text style={styles.btnTextStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
