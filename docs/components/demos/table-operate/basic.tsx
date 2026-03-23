import { OperateTable } from '@yss-rui/components';
import { Card } from 'antd';

export default () => {
  return (
    <Card title="OperateTable（标题 + 表格容器）">
      <OperateTable
        height={200}
        tableTitle="示例表格"
        downloadFun={() => alert('下载')}
      >
        <div style={{ padding: 16, background: '#fafafa' }}>子内容区域</div>
      </OperateTable>
    </Card>
  );
};
