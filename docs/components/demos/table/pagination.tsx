import { Table } from '@orinui/components';
import { Card } from 'antd';
import { useMemo } from 'react';

const columns = [
  { title: '序号', dataIndex: 'index', key: 'index', width: 72 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 72 },
  { title: '数值', dataIndex: 'value', key: 'value', width: 120 },
];

export default () => {
  const dataSource = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        id: String(i + 1),
        index: i + 1,
        name: `数据项 ${i + 1}`,
        value: (i + 1) * 7,
      })),
    [],
  );

  return (
    <Card title="带分页（会为分页条预留高度，再计算内容区 scroll.y）">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        height={380}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    </Card>
  );
};
