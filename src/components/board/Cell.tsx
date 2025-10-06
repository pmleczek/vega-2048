import { Config } from '@utils';
import { StyleSheet, View } from 'react-native';

const Cell = () => {
  return <View style={styles.cell} />;
};

export default Cell;

const styles = StyleSheet.create({
  cell: {
    backgroundColor: Config.CELL_BACKGROUND_COLOR,
    borderRadius: Config.CELL_BORDER_RADIUS,
    height: Config.TILE_SIZE,
    width: Config.TILE_SIZE,
  },
});
