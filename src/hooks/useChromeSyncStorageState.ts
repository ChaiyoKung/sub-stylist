import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDebounce } from './useDebounce';

export function useChromeSyncStorageState<S>(
  key: string,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const debouncedState = useDebounce(state, 200);
  const isFirstLoadRef = useRef<boolean>(true);

  useEffect(() => {
    const loadState = async () => {
      const states = await chrome.storage.sync.get(key);
      const state = states[key];
      if (state !== undefined) {
        setState(state);
      }
      isFirstLoadRef.current = false;
    };

    loadState();
  }, [key]);

  useEffect(() => {
    const saveState = async () => {
      await chrome.storage.sync.set({ [key]: debouncedState });
    };

    if (!isFirstLoadRef.current) {
      saveState();
    }
  }, [debouncedState, key]);

  return [state, setState];
}

export default useChromeSyncStorageState;
