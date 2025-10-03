import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vega 2048</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 32,
  },
});
