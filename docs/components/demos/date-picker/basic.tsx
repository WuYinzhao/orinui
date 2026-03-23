import { DatePicker } from '@yss-rui/components';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(dayjs());

  return (
    <Card title="DatePicker（dayjs）">
      <DatePicker value={value} onChange={(v) => v && setValue(v)} />
    </Card>
  );
};
