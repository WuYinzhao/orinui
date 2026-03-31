import type { TabsProps } from 'antd';

export interface CustomTabsProps {
  items?: TabsProps['items'];
  activeKey?: string;
  onChange?: TabsProps['onChange'];
}
