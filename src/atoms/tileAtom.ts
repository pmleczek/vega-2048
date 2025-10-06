import { makeInitialBoard } from '@utils';
import { atom } from 'jotai';

import type { Tile } from '../types';

export default atom<Tile[]>(makeInitialBoard());
