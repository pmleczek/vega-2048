import { atom } from 'jotai';

import type { StateAtomType } from './types';

export default atom<StateAtomType>({
  gameOver: false,
  score: 0,
  timeElapsed: 0,
});
