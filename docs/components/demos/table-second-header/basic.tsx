import { SecondHeader } from '@yss-rui/components';
import { Button, Card } from 'antd';

export default () => {
  return (
    <Card title="SecondHeader">
      <SecondHeader
        tableTitle="二级标题"
        operateContent={<Button size="small">操作</Button>}
      />
    </Card>
  );
};
