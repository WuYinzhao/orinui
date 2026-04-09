import type { FormProps } from 'antd';
import { ReactNode } from 'react';

export interface FormPanelProps extends FormProps {
  children?: ReactNode;
  onQuery?: (values: any) => void;
  queryLoading?: boolean;
  useResetButton?: boolean;
  onReset?: () => void;
}
