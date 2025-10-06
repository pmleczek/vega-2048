import { stateAtom } from '@atoms';
import { useHandleReset } from '@hooks';
import { Color } from '@utils';
import { useAtomValue } from 'jotai';
import { StyleSheet, Text, View } from 'react-native';

import PressableWithFeedback from '../pressable-with-feedback';

const ScoreModal = () => {
  const gameState = useAtomValue(stateAtom);
  const handleReset = useHandleReset();

  if (!gameState.gameOver) {
    return null;
  }

  const minutes = String(Math.floor(gameState.timeElapsed / 60)).padStart(
    2,
    '0',
  );
  const seconds = String(gameState.timeElapsed % 60).padStart(2, '0');

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.text}>Game Over</Text>
        <Text style={styles.textSecondary}>Score: {gameState.score}</Text>
        <Text style={styles.textSecondary}>
          Time elapsed: {minutes}:{seconds}
        </Text>
        <PressableWithFeedback onPress={handleReset} style={styles.button}>
          <Text style={styles.label}>Play Again</Text>
        </PressableWithFeedback>
      </View>
    </View>
  );
};

export default ScoreModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.button,
    borderRadius: 8,
    paddingVertical: 16,
  },
  container: {
    backgroundColor: Color.background,
    borderRadius: 8,
    borderWidth: 1,
    gap: 36,
    paddingHorizontal: 40,
    paddingVertical: 36,
    width: 512,
  },
  label: {
    color: Color.text,
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: Color.modalOverlay,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  text: {
    color: Color.text,
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
  },
  textSecondary: {
    color: Color.text,
    fontSize: 40,
    fontWeight: '600',
  },
});
