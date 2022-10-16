import {TextInputProps} from 'react-native';
interface HookResult {
  isFocused: boolean;
  onBlur: Exclude<TextInputProps['onBlur'], undefined>;
  onFocus: Exclude<TextInputProps['onFocus'], undefined>;
}
export declare const useFocusState: (
  onBlur?: TextInputProps['onBlur'],
  onFocus?: TextInputProps['onFocus'],
) => HookResult;
export {};
