import { TitleTooltip } from '@yss-rui/components';
import { Card } from 'antd';

export default () => {
  return (
    <Card title="TitleTooltip">
      <TitleTooltip text="指标名称" title="此处为口径说明文案" placement="top" />
    </Card>
  );
};
