import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from '@amazon-devices/react-native-reanimated';
import { stateAtom } from '@atoms';
import { Color } from '@utils';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

import Icon from '../icon';
import type { ScoreProps } from './types';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Score = ({ initialValue }: ScoreProps) => {
  const gameState = useAtomValue(stateAtom);
  const scoreSV = useSharedValue(gameState.score);

  useEffect(() => {
    scoreSV.value = withTiming(gameState.score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.score]);

  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: String(Math.floor(scoreSV.value)),
      }) as TextInputProps,
    [gameState.score],
  );

  return (
    <View style={styles.container}>
      <Icon
        icon="trophy"
        stroke={Color.text}
        strokeWidth={2}
        width={32}
        height={32}
      />
      <AnimatedTextInput
        animatedProps={animatedProps}
        editable={false}
        value={String(initialValue)}
        style={styles.score}
      />
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.background,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  score: {
    color: Color.text,
    fontSize: 36,
    fontWeight: '500',
    textAlign: 'right',
    width: 80,
  },
});
