import { DataProcess, getRowSpan } from '@yss-rui/utils';
import { Card, Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const tableData = [
  { id: 1, name: '张三', department: '技术部', position: '工程师' },
  { id: 2, name: '李四', department: '技术部', position: '工程师' },
  { id: 3, name: '王五', department: '技术部', position: '经理' },
  { id: 4, name: '赵六', department: '产品部', position: '产品经理' },
  { id: 5, name: '钱七', department: '产品部', position: '产品经理' },
];

const headerData = [
  { key: 'name', title: '姓名' },
  {
    key: 'dept',
    title: '部门信息',
    children: [
      { key: 'department', title: '部门' },
      { key: 'position', title: '职位' },
    ],
  },
];

export default () => {
  // 计算合并行
  const dataWithRowSpan = getRowSpan(
    [...tableData],
    ['department', 'position'],
  );

  // 扁平化表头
  const flatHeaders = DataProcess([...headerData]);

  const columns: ColumnsType<(typeof tableData)[0]> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (val, record: any) => ({
        children: val,
        props: { rowSpan: record.rowSpandepartment || 0 },
      }),
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      render: (val, record: any) => ({
        children: val,
        props: { rowSpan: record.rowSpanposition || 0 },
      }),
    },
  ];

  return (
    <Card title="表格工具示例">
      <Divider>表头扁平化</Divider>
      <pre style={{ background: '#f5f5f5', padding: 16 }}>
        {JSON.stringify(
          flatHeaders.map((h) => h.title),
          null,
          2,
        )}
      </pre>

      <Divider>合并相同部门/职位</Divider>
      <Table
        columns={columns}
        dataSource={dataWithRowSpan}
        rowKey="id"
        pagination={false}
        bordered
      />
    </Card>
  );
};
