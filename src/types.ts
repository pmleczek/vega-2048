export enum Directions {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface Tile {
  id: number;
  row: number;
  column: number;
  value: number;
  zombie: boolean;
  hasJustBeenMerged: boolean;
}
