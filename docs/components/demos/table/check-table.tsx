import { Table } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
  { title: '数值', dataIndex: 'value', key: 'value', width: 150 },
];

const dataSource = [
  { id: '1', name: '行 1', value: 11 },
  { id: '2', name: '行 2', value: 22 },
  { id: '3', name: '行 3', value: 33 },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  return (
    <Card title="左侧选中">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        height={300}
        pagination={false}
        rowSelection={{
          columnWidth: 48,
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys: any[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
    </Card>
  );
};
