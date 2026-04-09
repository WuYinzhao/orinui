import { Table } from '@orinui/components';
import { Card } from 'antd';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: 'left',
    render: (text: string, { level }: any) => {
      if (level === '4') {
        return (
          <div
            className="ant-table-cell-ellipsis"
            style={{ fontWeight: 'bold', fontSize: 16 }}
          >
            {text}
          </div>
        );
      }
      return text;
    },
    onCell: ({ level }: any) => {
      if (level === '4') {
        return { style: { backgroundColor: '#B6D0EE' } };
      }
    },
  },
  {
    title: '数值',
    dataIndex: 'value',
    key: 'value',
    width: 150,
    onCell: ({ level }: any) => {
      if (level === '4') {
        return { style: { backgroundColor: '#B6D0EE' } };
      }
    },
  },
  {
    title: '数值1',
    dataIndex: 'value1',
    key: 'value1',
    width: 150,
    onCell: ({ level }: any) => {
      if (level === '4') {
        return { style: { backgroundColor: '#B6D0EE' } };
      }
    },
  },
  {
    title: '数值2',
    dataIndex: 'value2',
    key: 'value2',
    width: 150,
    onCell: ({ level }: any) => {
      if (level === '4') {
        return { style: { backgroundColor: '#B6D0EE' } };
      }
    },
  },
  {
    title: '数值3',
    dataIndex: 'value3',
    key: 'value3',
    width: 150,
    onCell: ({ level }: any) => {
      if (level === '4') {
        return { style: { backgroundColor: '#B6D0EE' } };
      }
    },
  },
];

const dataSource = [
  {
    id: '1',
    name: '行 1',
    value: 11,
    value1: 11,
    value2: 11,
    value3: 11,
    level: '4',
  },
  {
    id: '2',
    name: '行 2',
    value: 22,
    value1: 22,
    value2: 22,
    value3: 22,
    level: '5',
  },
  {
    id: '3',
    name: '行 3',
    value: 33,
    value1: 33,
    value2: 33,
    value3: 33,
    level: '4',
  },
  {
    id: '4',
    name: '行 4',
    value: 44,
    value1: 44,
    value2: 44,
    value3: 44,
    level: '5',
  },
  {
    id: '5',
    name: '行 5',
    value: 55,
    value1: 55,
    value2: 55,
    value3: 55,
    level: '4',
  },
  {
    id: '6',
    name: '行 6',
    value: 66,
    value1: 66,
    value2: 66,
    value3: 66,
    level: '4',
  },
  {
    id: '7',
    name: '行 7',
    value: 77,
    value1: 77,
    value2: 77,
    value3: 77,
    level: '5',
  },
  {
    id: '8',
    name: '行 8',
    value: 88,
    value1: 88,
    value2: 88,
    value3: 88,
    level: '4',
  },
  {
    id: '9',
    name: '行 9',
    value: 99,
    value1: 99,
    value2: 99,
    value3: 99,
    level: '5',
  },
  {
    id: '10',
    name: '行 10',
    value: 100,
    value1: 100,
    value2: 100,
    value3: 100,
    level: '4',
  },
];

export default () => {
  return (
    <Card title="Render渲染">
      <Table
        rowKey="id"
        columns={columns as any}
        dataSource={dataSource}
        height={300}
        virtual={true}
        pagination={false}
      />
    </Card>
  );
};
