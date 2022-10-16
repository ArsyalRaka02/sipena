import {StyleProp, TextStyle} from 'react-native';
export declare const getSymbols: (
  codeValue: string,
  codeLength: number,
) => string[];
export declare const getStyle: (
  base: StyleProp<TextStyle>,
  custom?: StyleProp<TextStyle>,
) => StyleProp<TextStyle>;
interface Params {
  value: string;
  index: number;
}
export declare const isLastFilledCell: ({value, index}: Params) => boolean;
export {};
