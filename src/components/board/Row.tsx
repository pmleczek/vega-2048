import { Config } from '@utils';
import { StyleSheet, View } from 'react-native';

import Cell from './Cell';
import type { RowProps } from './types';

const Row = ({ n }: RowProps) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: n }).map((_, column) => (
        <Cell key={column} />
      ))}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Config.GAP,
  },
});
