import { tileAtom } from '@atoms';
import {
  Board,
  GradientBackground,
  Score,
  ScoreModal,
  Timer,
} from '@components';
import { Config, getPoints } from '@utils';
import { useAtomValue } from 'jotai';
import { StyleSheet, View } from 'react-native';

const GameScreen = () => {
  const tiles = useAtomValue(tileAtom);

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.scoreRow}>
        <Score initialValue={getPoints(tiles)} />
        <Timer />
      </View>
      <Board n={Config.N} />
      <ScoreModal />
    </GradientBackground>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    position: 'relative',
  },
  scoreRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 16,
    // Match the board width
    // 5 * GAP + N * TILE_SIZE
    width: 5 * Config.GAP + Config.N * Config.TILE_SIZE,
  },
});
