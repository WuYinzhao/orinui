import type { TreeSelectProps } from 'antd';

/** 与组件内 `fieldNames` 默认值及 TreeSelect 用法对齐 */
export type CustomSelectFieldNames = NonNullable<TreeSelectProps['fieldNames']>;

export interface CustomSelectProps
  extends Omit<
    TreeSelectProps<string[]>,
    'treeData' | 'value' | 'onChange' | 'open'
  > {
  treeData?: TreeSelectProps['treeData'];
  value?: string[];
  onChange?: (value: string[]) => void;
  fieldNames?: CustomSelectFieldNames;
  queryloading?: boolean;
}
