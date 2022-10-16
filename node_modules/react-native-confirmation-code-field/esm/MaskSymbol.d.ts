/// <reference types="react" />
export declare const DEFAULT_BLINKING_SPEED = 500;
interface Props {
  maskSymbol: string;
  isLastFilledCell: boolean;
  children: string;
  delay?: number;
}
export declare function MaskSymbol({
  isLastFilledCell,
  children: symbol,
  maskSymbol,
  delay,
}: Props): JSX.Element;
export {};
