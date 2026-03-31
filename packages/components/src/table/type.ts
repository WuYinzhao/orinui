import type { TableProps } from 'antd';

export interface VirtualTableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends TableProps<T> {
  id?: string;
  height: number;
  isScroll?: boolean;
  isVirtualTable?: boolean;
  virtualId?: string;
  lineHeight?: number;
  paddingNum?: number;
}
