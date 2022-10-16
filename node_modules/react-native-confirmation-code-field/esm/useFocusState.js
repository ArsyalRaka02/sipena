import {useState} from 'react';
import {useEvent} from './useEvent';
export const useFocusState = (onBlur, onFocus) => {
  const [isFocused, setFocusFlag] = useState(false);
  return {
    isFocused,
    onBlur: useEvent(onBlur, () => setFocusFlag(false)),
    onFocus: useEvent(onFocus, () => setFocusFlag(true)),
  };
};
