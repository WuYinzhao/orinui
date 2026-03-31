import type { DataNode } from 'antd/es/tree';
import type { Key } from 'react';

export interface SingleTreeProps {
  treeData: DataNode[];
  selectedKeys?: Key;
  width?: number;
  onSelectKeys?: (key: Key, node: DataNode) => void;
  size?: 'large' | 'small';
  showSwitcher?: boolean;
}
