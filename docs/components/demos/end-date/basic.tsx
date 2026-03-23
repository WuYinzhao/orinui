import { EndDate, EndDateUtils } from '@yss-rui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState({
    selectVal: 'custom' as const,
    endDate: EndDateUtils.getInitValue(),
  });

  return (
    <Card title="EndDate 结束日">
      <EndDate value={value} onChange={setValue} />
    </Card>
  );
};
