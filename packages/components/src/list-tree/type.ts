export interface ListTreeFieldNames {
  id: string;
  name: string;
}

/** 选项行：至少包含 fieldNames 所指字段，可含 disabled */
export type ListTreeCheckboxOption = Record<
  string,
  string | number | boolean | undefined
>;

export interface ListTreeProps {
  checkboxOption: ListTreeCheckboxOption[];
  defaultValue?: Array<string | number>;
  fieldNames?: ListTreeFieldNames;
  leftCheckChange?: (res: ListTreeCheckboxOption[]) => void;
  isSingle?: boolean;
}
