/// <reference types="react" />
export declare const DEFAULT_BLINKING_SPEED = 500;
export declare const DEFAULT_CURSOR_SYMBOL = '|';
export declare function Cursor({
  cursorSymbol,
  delay,
}: {
  cursorSymbol?: string | undefined;
  delay?: number | undefined;
}): JSX.Element;
