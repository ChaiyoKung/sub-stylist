import { useEffect, useRef, useState } from 'react';

export function useChromeSyncStorageState<S>(
  key: string,
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
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
      await chrome.storage.sync.set({ [key]: state });
    };

    if (!isFirstLoadRef.current) {
      saveState();
    }
  }, [key, state]);

  return [state, setState];
}

export default useChromeSyncStorageState;
