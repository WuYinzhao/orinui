import { Chart } from '@yss-rui/components';
import { Card } from 'antd';

export default () => {
  const optionDefault = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [{ name: '示例', type: 'bar', data: [120, 200, 150] }],
  };

  return (
    <Card title="Chart 基础示例">
      <Chart
        optionDefault={optionDefault}
        style={{ width: '100%', height: 320 }}
      />
    </Card>
  );
};
