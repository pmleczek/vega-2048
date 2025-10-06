import {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from '@amazon-devices/react-native-gesture-handler';
import { HWEvent } from '@amazon-devices/react-native-kepler';
import { stateAtom, tileAtom } from '@atoms';
import { getDirection, getPoints, isBoardFull, makeMove } from '@utils';
import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';

import { Directions } from '../types';
import useUpdateState from './useUpdateState';

type GestureHandlerEvent =
  GestureStateChangeEvent<PanGestureHandlerEventPayload>;
type EventType = HWEvent | GestureHandlerEvent;

const isGestureHandlerEvent = (
  event: EventType,
): event is GestureHandlerEvent => {
  return (event as GestureHandlerEvent).translationX !== undefined;
};

const isDirection = (
  eventType: string | Directions,
): eventType is Directions => {
  return ['up', 'right', 'down', 'left'].includes(eventType);
};

const useHandleEvent = () => {
  const gameState = useAtomValue(stateAtom);
  const updateState = useUpdateState();
  const [tiles, setTiles] = useAtom(tileAtom);

  const handleEvent = useCallback(
    (event: EventType) => {
      if (gameState.gameOver) {
        return;
      }

      let direction: Directions | null = null;
      if (isGestureHandlerEvent(event)) {
        direction = getDirection(event.translationX, event.translationY);
      } else if (event.eventKeyAction === 1 && isDirection(event.eventType)) {
        direction = event.eventType;
      }

      if (!direction) {
        return;
      }

      const nextTiles = makeMove(tiles, direction);
      setTiles(nextTiles);
      updateState({ score: getPoints(nextTiles) });

      if (isBoardFull(nextTiles)) {
        updateState({ gameOver: true });
      }
    },
    [gameState.gameOver, setTiles, tiles, updateState],
  );

  return handleEvent;
};

export default useHandleEvent;
