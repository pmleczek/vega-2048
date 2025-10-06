import { stateAtom } from '@atoms';
import { useUpdateState } from '@hooks';
import { Color } from '@utils';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AnimatedClock from '../animated-clock';

const Timer = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameState = useAtomValue(stateAtom);
  const updateState = useUpdateState();
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const handleInterval = useCallback(() => {
    setTimeElapsed((prev) => ++prev);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (!gameState.gameOver) {
      setTimeElapsed(0);
      timerRef.current = setInterval(handleInterval, 1_000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      updateState({ timeElapsed });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.gameOver, handleInterval, updateState]);

  const minutes = String(Math.floor(timeElapsed / 60)).padStart(2, '0');
  const seconds = String(timeElapsed % 60).padStart(2, '0');

  return (
    <View style={styles.container}>
      <AnimatedClock />
      <Text style={styles.timer}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
};

export default Timer;

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
  timer: {
    color: Color.text,
    fontSize: 36,
    fontWeight: '500',
  },
});
