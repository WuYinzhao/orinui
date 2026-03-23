import { DateRangeUtils } from '@yss-rui/components';
import { Card, Space, Typography } from 'antd';

export default () => {
  const range = DateRangeUtils.getInitValue();
  const begin = DateRangeUtils.getBeginDate(range[1], 3, '2002-01-01');

  return (
    <Card title="DateRangeUtils 示例">
      <Space direction="vertical">
        <Typography.Text>getInitValue(): {JSON.stringify(range)}</Typography.Text>
        <Typography.Text>
          getBeginDate(结束日, 3月, min): {begin}
        </Typography.Text>
      </Space>
    </Card>
  );
};
