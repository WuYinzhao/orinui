import type { TreeProps } from 'antd';
import type { Key } from 'react';

export type TreeCheckInfo = Parameters<NonNullable<TreeProps['onCheck']>>[1];

/** 业务树节点（与 fieldNames title/key 及搜索 name 字段一致） */
export interface ComplexTreeNode {
  key: string;
  name: string;
  children?: ComplexTreeNode[];
  disabled?: boolean;
}

export interface ComplexTreeToggleItem {
  value: string;
  label: string;
}

export interface ComplexTreeProps {
  treeData: ComplexTreeNode[];
  checkedKeys?: string[];
  describeTips?: string;
  toggleData?: ComplexTreeToggleItem[];
  toggleKey?: string;
  disabledItemFunc?: (item: ComplexTreeNode) => boolean;
  showLine?: boolean;
  switcherIcon?: boolean;
  onClickToggle?: (val: string) => void;
  onClickCheck?: (keys: string[], e: TreeCheckInfo) => void;
  isCtrl?: boolean;
  multiple_check?: boolean;
  checkStrictly?: boolean;
  disableChildren?: boolean;
}

export interface BaseTreeProps {
  searchValue?: string;
  treeList: ComplexTreeNode[];
  checkedKeys?: string[];
  expandedKeys?: Key[];
  showLine?: boolean;
  switcherIcon?: boolean;
  disabledItemFunc?: (item: ComplexTreeNode) => boolean;
  onClickCheck?: (keys: string[], e: TreeCheckInfo) => void;
  onExpand?: (expandedKeys: Key[]) => void;
  isCtrl?: boolean;
  multiple_check?: boolean;
  checkStrictly?: boolean;
  disableChildren?: boolean;
}

/** `getAllKeysForTreeData` 等工具里与 antd Tree 节点混用的结构 */
export type TreeKeyNode = {
  key: string;
  data?: ComplexTreeNode;
  children?: TreeKeyNode[];
};
