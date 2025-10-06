import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from '@amazon-devices/react-native-reanimated';
import { Config, getTileBackgroundColor, getTileForegroundColor } from '@utils';
import { useEffect, useMemo } from 'react';
import { type StyleProp, StyleSheet, Text, type ViewStyle } from 'react-native';

import type { TileProps } from './types';

const Tile = ({ column, hasJustBeenMerged, row, value, zombie }: TileProps) => {
  const tileStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      zIndex: zombie ? 1 : 2,
      backgroundColor: getTileBackgroundColor(value),
    }),
    [value, zombie],
  );

  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: scale.value,
        },
      ],
    }),
    [hasJustBeenMerged],
  );

  const animatedSlideStyle = useAnimatedStyle(
    () => ({
      top: withTiming(row * (Config.TILE_SIZE + Config.GAP) + Config.GAP),
      left: withTiming(column * (Config.TILE_SIZE + Config.GAP) + Config.GAP),
    }),
    [column, row],
  );

  useEffect(() => {
    if (hasJustBeenMerged) {
      scale.value = withDelay(150, withSpring(1, { duration: 200 }));
    } else {
      scale.value = withDelay(150, withTiming(1, { duration: 150 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasJustBeenMerged]);

  return (
    <Animated.View
      style={[styles.tile, tileStyle, animatedStyle, animatedSlideStyle]}
    >
      <Text style={[styles.value, { color: getTileForegroundColor(value) }]}>
        {value}
      </Text>
    </Animated.View>
  );
};

export default Tile;

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    borderRadius: Config.CELL_BORDER_RADIUS,
    height: Config.TILE_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    width: Config.TILE_SIZE,
  },
  value: {
    fontSize: 35,
    fontWeight: 'bold',
  },
});
