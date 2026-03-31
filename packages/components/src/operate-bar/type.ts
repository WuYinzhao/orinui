export interface OperateBarUnitOption {
  unit: string;
  name: string;
}

export interface OperateBarProps {
  unitChar?: string;
  unit?: string;
  downloadFun?: () => void;
  unitOption?: OperateBarUnitOption[];
  unitFun?: (unit: string) => void;
}
