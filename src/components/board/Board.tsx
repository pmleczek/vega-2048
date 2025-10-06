import {
  Gesture,
  GestureDetector,
} from '@amazon-devices/react-native-gesture-handler';
import { useTVEventHandler } from '@amazon-devices/react-native-kepler';
import { tileAtom } from '@atoms';
import { useHandleEvent } from '@hooks';
import { Config } from '@utils';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { Tile } from '../../types';
import TileComponent from '../tile';
import Row from './Row';
import type { BoardProps } from './types';

const Board = ({ n }: BoardProps) => {
  const tiles = useAtomValue(tileAtom);
  const handleEvent = useHandleEvent();

  useTVEventHandler(handleEvent);

  const fling = useMemo(() => {
    return Gesture.Pan().runOnJS(true).onEnd(handleEvent);
  }, [handleEvent]);

  return (
    <GestureDetector gesture={fling}>
      <View style={styles.container}>
        {Array.from({ length: n }).map((_, row) => (
          <Row key={row} n={n} />
        ))}
        {tiles.map(({ id, ...rest }: Tile) => (
          <TileComponent key={id} {...rest} />
        ))}
      </View>
    </GestureDetector>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Config.CELL_BORDER_COLOR,
    borderRadius: Config.GAP,
    gap: Config.GAP,
    padding: Config.GAP,
    position: 'relative',
  },
});
