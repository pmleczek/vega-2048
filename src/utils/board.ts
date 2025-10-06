import { Directions, type Tile } from '../types';
import Config from './config';
import {
  areTilesEqual,
  extractRow,
  filterOutZombieTiles,
  makeId,
  moveRowLeft,
  sortTiles,
  transformTiles,
} from './tile';

export const addRandomTile = (oldTiles: Tile[]): Tile[] => {
  const MAX = Config.N * Config.N;
  const taken = oldTiles.map((tile) => tile.row * Config.N + tile.column);
  const free = [...new Array(MAX)]
    .map((_, i) => i)
    .filter((i) => !taken.includes(i));
  if (free.length === 0) {
    throw new Error('No empty cells');
  }
  const idx = free[Math.floor(Math.random() * free.length)];
  const row = Math.floor(idx / Config.N);
  const column = idx % Config.N;
  const value = Math.random() < 0.5 ? 4 : 2;
  return oldTiles.concat({
    row,
    column,
    value,
    id: makeId(),
    zombie: false,
    hasJustBeenMerged: false,
  });
};

export const getDirection = (dx: number, dy: number) => {
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? Directions.RIGHT : Directions.LEFT;
  } else {
    return dy > 0 ? Directions.DOWN : Directions.UP;
  }
};

export const isBoardFull = (tiles: Tile[]): boolean => {
  return filterOutZombieTiles(tiles).length === Config.N * Config.N;
};

export const makeInitialBoard = (): Tile[] => {
  return addRandomTile(addRandomTile([]));
};

export const makeMove = (oldTiles: Tile[], direction: Directions): Tile[] => {
  oldTiles = transformTiles(oldTiles, direction, false);
  let newTiles: Tile[] = [];
  const aliveTiles = filterOutZombieTiles(oldTiles);
  for (let row = 0; row < 4; row++) {
    const oldRow = extractRow(aliveTiles, row);
    const newRow = moveRowLeft(oldRow);
    newTiles = newTiles.concat(newRow);
  }
  if (!areTilesEqual(aliveTiles, newTiles)) {
    newTiles = addRandomTile(newTiles);
  }
  newTiles = transformTiles(newTiles, direction, true);
  return sortTiles(newTiles);
};
