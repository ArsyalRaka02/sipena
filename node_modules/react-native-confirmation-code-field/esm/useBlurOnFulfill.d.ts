/// <reference types="react" />
import {TextInput} from 'react-native';
interface Options {
  value?: string;
  cellCount: number;
}
export declare const useBlurOnFulfill: ({
  value,
  cellCount,
}: Options) => import('react').RefObject<TextInput>;
export {};
