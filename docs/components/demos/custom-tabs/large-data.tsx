import { CustomTabs } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [activeKey, setActiveKey] = useState('1');
  const items = Array.from({ length: 100 }, (_, index) => ({
    key: index.toString(),
    label: `页签${index + 1}`,
    children: <div style={{ padding: 16 }}>内容{index + 1}</div>,
  }));

  return (
    <Card title="CustomTabs">
      <CustomTabs items={items} activeKey={activeKey} onChange={setActiveKey} />
    </Card>
  );
};
