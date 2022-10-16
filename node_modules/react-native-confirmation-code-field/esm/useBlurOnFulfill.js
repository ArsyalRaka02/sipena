import {useRef, useEffect} from 'react';
export const useBlurOnFulfill = ({value, cellCount}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (value && value.length === cellCount) {
      const inputInstance = inputRef.current;
      if (inputInstance) {
        inputInstance.blur();
      }
    }
  }, [value, cellCount]);
  return inputRef;
};
