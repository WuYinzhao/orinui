import {
  DateOptions,
  getEndDate,
  getStartDate,
  getYearEndDate,
  getYearStartOfDate,
  moneyList,
} from '@yss-rui/utils';
import { Card, Descriptions, Tag } from 'antd';

export default () => {
  return (
    <Card title="日期工具示例">
      <Descriptions column={1} bordered>
        <Descriptions.Item label="getStartDate()">
          {getStartDate(0, 'year')}
        </Descriptions.Item>
        <Descriptions.Item label="getEndDate()">
          {getEndDate(0, 'year')}
        </Descriptions.Item>
        <Descriptions.Item label="getYearStartOfDate(1)">
          {getYearStartOfDate(1)}
        </Descriptions.Item>
        <Descriptions.Item label="getYearEndDate(1)">
          {getYearEndDate(1)}
        </Descriptions.Item>
        <Descriptions.Item label="DateOptions">
          {DateOptions.map((item) => (
            <Tag key={item.value}>{item.label}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="moneyList">
          {moneyList.map((item) => (
            <Tag key={item.value}>{item.label}</Tag>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
