import type { ColorValue } from 'react-native';

import { Directions, type Tile } from '../types';
import Config from './config';

let nextid = 1;

export const areTilesEqual = (tiles1: Tile[], tiles2: Tile[]): boolean => {
  if (tiles1.length !== tiles2.length) {
    return false;
  }
  sortTiles(tiles1);
  sortTiles(tiles2);
  for (let i = 0; i < tiles1.length; i++) {
    if (
      tiles1[i].id !== tiles2[i].id ||
      tiles1[i].column !== tiles2[i].column ||
      tiles1[i].row !== tiles2[i].row
    ) {
      return false;
    }
  }
  return true;
};

export const extractRow = (tiles: Tile[], row: number): Tile[] => {
  return tiles.filter((tile) => tile.row === row);
};

export const filterOutZombieTiles = (tiles: Tile[]): Tile[] => {
  return tiles.filter((tile) => !tile.zombie);
};

export const flipTilesVertically = (tiles: Tile[]): Tile[] => {
  return tiles.map((tile) => ({ ...tile, column: Config.N - 1 - tile.column }));
};

export const getPoints = (tiles: Tile[]): number => {
  return filterOutZombieTiles(tiles).reduce((acc, tile) => acc + tile.value, 0);
};

export const getTileBackgroundColor = (value: number): ColorValue => {
  switch (value) {
    case 2:
      return 'rgb(236,228,219)';
    case 4:
      return 'rgb(234,224,202)';
    case 8:
      return 'rgb(232,180,129)';
    case 16:
      return 'rgb(231,154,109)';
    case 32:
      return 'rgb(230,130,102)';
    case 64:
      return 'rgb(228,104,71)';
    case 128:
      return 'rgb(232,208,127)';
    case 256:
      return 'rgb(231,205,113)';
    case 512:
      return 'rgb(231,201,100)';
    case 1024:
      return 'rgb(230,198,89)';
    case 2048:
      return 'rgb(230,195,79)';
    default:
      return 'rgb(60,56,50)';
  }
};

export function getTileForegroundColor(value: number): ColorValue {
  return value <= 4 ? 'rgb(117,111,102)' : 'rgb(249,246,243)';
}

export const makeId = (): number => {
  return nextid++;
};

export const moveRowLeft = (oldTiles: Tile[]): Tile[] => {
  if (oldTiles.some((tile) => tile.zombie)) {
    throw new Error('Unexpected zombie tile');
  }
  const newTiles: Tile[] = [];
  const oldTilesSortedByColumn = oldTiles.sort((a, b) => a.column - b.column);
  let nextColumn = 0;
  for (let i = 0; i < oldTilesSortedByColumn.length; i++) {
    const thisTile = oldTilesSortedByColumn[i];
    const nextTile = oldTilesSortedByColumn[i + 1];
    if (nextTile !== undefined && thisTile.value === nextTile.value) {
      // merge tiles
      newTiles.push({ ...thisTile, column: nextColumn, zombie: true });
      newTiles.push({ ...nextTile, column: nextColumn, zombie: true });
      newTiles.push({
        id: makeId(),
        row: thisTile.row,
        column: nextColumn,
        value: thisTile.value * 2,
        zombie: false,
        hasJustBeenMerged: true,
      });
      i++; // skip next tile
    } else {
      newTiles.push({
        ...thisTile,
        column: nextColumn,
        hasJustBeenMerged: false,
      });
    }
    nextColumn++;
  }
  return newTiles;
};

export const sortTiles = (tiles: Tile[]): Tile[] => {
  return tiles.sort((a, b) => a.id - b.id);
};

export const transformTiles = (
  tiles: Tile[],
  direction: Directions,
  reverse: boolean,
): Tile[] => {
  switch (direction) {
    case Directions.LEFT:
      return tiles;
    case Directions.RIGHT:
      return flipTilesVertically(tiles);
    case Directions.UP:
      return transposeTiles(tiles);
    case Directions.DOWN:
      return reverse
        ? transposeTiles(flipTilesVertically(tiles))
        : flipTilesVertically(transposeTiles(tiles));
  }
};

export const transposeTiles = (tiles: Tile[]): Tile[] => {
  return tiles.map((tile) => ({ ...tile, row: tile.column, column: tile.row }));
};
