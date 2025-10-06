import { GestureHandlerRootView } from '@amazon-devices/react-native-gesture-handler';
import { GameScreen } from '@screens';
import { StyleSheet } from 'react-native';

export const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <GameScreen />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
