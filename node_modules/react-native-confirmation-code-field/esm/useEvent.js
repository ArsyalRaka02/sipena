import {useCallback} from 'react';
export const useEvent = (nativeEvent, customHandler) =>
  useCallback(
    (event) => {
      customHandler();
      if (typeof nativeEvent === 'function') {
        nativeEvent(event);
      }
    },
    [nativeEvent],
  );
