import type { CSSProperties, ReactNode } from 'react';

export interface TitleBarProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  leftType?: 'text' | 'opreate';
  rightType?: 'text' | 'opreate';
}
