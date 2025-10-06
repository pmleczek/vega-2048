import { stateAtom, StateAtomType } from '@atoms';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

const useUpdateState = () => {
  const setGameState = useSetAtom(stateAtom);

  const updateState = useCallback(
    (update: Partial<StateAtomType>) => {
      setGameState((prev) => ({
        ...prev,
        ...update,
      }));
    },
    [setGameState],
  );

  return updateState;
};

export default useUpdateState;
