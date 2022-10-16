import {NativeSyntheticEvent} from 'react-native';
export declare const useEvent: <Event_1 extends NativeSyntheticEvent<any>>(
  nativeEvent: ((event: Event_1) => void) | undefined,
  customHandler: () => void,
) => (e: Event_1) => void;
