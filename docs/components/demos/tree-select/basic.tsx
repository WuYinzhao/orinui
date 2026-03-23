import { CustomSelect } from '@yss-rui/components';
import { Card } from 'antd';
import { useState } from 'react';

const treeData = [
  {
    label: '父级',
    value: 'p1',
    children: [
      { label: '子项 1', value: 'c1' },
      { label: '子项 2', value: 'c2' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Card title="CustomSelect（树形多选）">
      <CustomSelect
        style={{ width: 320 }}
        treeData={treeData}
        value={value}
        onChange={setValue}
        placeholder="请选择"
      />
    </Card>
  );
};
