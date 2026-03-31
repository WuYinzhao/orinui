import { Tabs } from 'antd';
import { TabsContainer } from './styled';
import type { CustomTabsProps } from './type';
/*
activeKey 选中项
items 项集合
onChange 切换方法
*/

export default (props: CustomTabsProps) => {
  const { items, activeKey, onChange } = props;
  return (
    <TabsContainer>
      <Tabs
        style={{ height: '100%' }}
        activeKey={activeKey}
        items={items}
        onChange={onChange}
      />
    </TabsContainer>
  );
};
