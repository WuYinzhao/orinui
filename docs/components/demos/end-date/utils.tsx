import { EndDateUtils } from '@yss-rui/components';
import { Card, Space, Typography } from 'antd';

export default () => {
  return (
    <Card title="EndDateUtils 示例">
      <Space direction="vertical">
        <Typography.Text>getInitValue(): {EndDateUtils.getInitValue()}</Typography.Text>
        <Typography.Text>getQuarterDay: {EndDateUtils.getQuarterDay('YYYY-MM-DD')}</Typography.Text>
      </Space>
    </Card>
  );
};
