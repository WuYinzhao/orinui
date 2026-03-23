import { DateRangePicker, DateRangeUtils } from '@yss-rui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState({
    selectVal: 'custom',
    date: DateRangeUtils.getInitValue() as [string, string],
  });

  return (
    <Card title="DateRangePicker">
      <DateRangePicker value={value} onChange={setValue} />
    </Card>
  );
};
