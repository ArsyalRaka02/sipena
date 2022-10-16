import {useEffect, useRef} from 'react';
const creteUseTimer = (clear, runTimer) => (callback, delay) => {
  const timerRef = useRef();
  useEffect(() => {
    const stop = () => clear(timerRef.current);
    stop();
    timerRef.current = runTimer(callback, delay);
    return stop;
  }, [delay]);
};
export const useInterval = creteUseTimer(
  // @ts-expect-error - I know better
  clearInterval,
  setInterval,
);
export const useTimeout = creteUseTimer(
  // @ts-expect-error - I know better
  clearTimeout,
  setTimeout,
);
