import { tileAtom } from '@atoms';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

import { getPoints, makeInitialBoard } from '../utils';
import useUpdateState from './useUpdateState';

const useHandleReset = () => {
  const updateState = useUpdateState();
  const setTiles = useSetAtom(tileAtom);

  const handleReset = useCallback(() => {
    const tiles = makeInitialBoard();
    setTiles(tiles);
    updateState({ gameOver: false, score: getPoints(tiles), timeElapsed: 0 });
  }, [setTiles, updateState]);

  return handleReset;
};

export default useHandleReset;
