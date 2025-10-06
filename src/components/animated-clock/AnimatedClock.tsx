import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from '@amazon-devices/react-native-reanimated';
import { stateAtom } from '@atoms';
import { Color } from '@utils';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const BORDER_WIDTH = 2;
const HOUR_HAND_LENGTH = 8;
const MINUTE_HAND_LENGTH = 10;
const SIZE = 28;

const rad = (degrees: number): string => {
  'worklet';
  if (!degrees || isNaN(degrees)) {
    return '0rad';
  }

  return `${(degrees / 180) * Math.PI}rad`;
};

const AnimatedClock = () => {
  const gameState = useAtomValue(stateAtom);
  const rotation = useSharedValue(0);

  const minuteHandAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rad((rotation.value * 12) % 360) }],
    };
  });

  const hourHandAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rad(rotation.value % 360) }],
    };
  });

  useEffect(() => {
    if (!gameState.gameOver) {
      rotation.value = 0;
      rotation.value = withRepeat(
        withTiming(360, { duration: 60_000, easing: Easing.linear }),
        -1,
      );
    } else {
      cancelAnimation(rotation);
    }
    return () => cancelAnimation(rotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.gameOver]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.handContainer, minuteHandAnimatedStyle]}>
        <View style={styles.minuteHand} />
      </Animated.View>
      <Animated.View style={[styles.handContainer, hourHandAnimatedStyle]}>
        <View style={styles.hourHand} />
      </Animated.View>
    </View>
  );
};

export default AnimatedClock;

const styles = StyleSheet.create({
  container: {
    borderColor: Color.text,
    borderRadius: SIZE / 2,
    borderWidth: BORDER_WIDTH,
    height: SIZE,
    position: 'relative',
    width: SIZE,
  },
  handContainer: {
    alignItems: 'center',
    height: SIZE,
    left: -BORDER_WIDTH,
    position: 'absolute',
    top: -BORDER_WIDTH,
    width: SIZE,
  },
  hourHand: {
    backgroundColor: Color.text,
    borderRadius: 6,
    height: HOUR_HAND_LENGTH,
    marginTop: SIZE / 2 - HOUR_HAND_LENGTH,
    width: BORDER_WIDTH,
  },
  minuteHand: {
    backgroundColor: Color.text,
    borderRadius: 6,
    height: MINUTE_HAND_LENGTH,
    marginTop: SIZE / 2 - MINUTE_HAND_LENGTH,
    width: BORDER_WIDTH,
  },
});
