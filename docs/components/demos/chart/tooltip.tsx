import { ChartTooltip } from '@yss-rui/components';
import { Card, Typography } from 'antd';

export default () => {
  const params = [
    {
      marker: '<span></span>',
      seriesName: '序列A',
      axisValue: '2024-01',
      seriesType: 'bar',
      data: [1, 10.12],
      seriesIndex: 0,
    },
  ];
  const html = ChartTooltip.tooltipFormate(params, { precision: 2 });

  return (
    <Card title="ChartTooltip 格式化">
      <Typography.Paragraph>
        tooltipFormate 返回的 HTML 字符串（用于 ECharts tooltip.formatter）：
      </Typography.Paragraph>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Card>
  );
};
