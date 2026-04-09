import { FormPanel, Styled } from '@orinui/components';
import { Card, DatePicker, Form } from 'antd';
import { useState } from 'react';

const { Page, Content } = Styled;

export default () => {
  const [form] = Form.useForm();
  const [queryLoading, setQueryLoading] = useState(false);
  const onQuery = () => {
    setQueryLoading(true);
    setTimeout(() => {
      setQueryLoading(false);
    }, 1000);
  };
  return (
    <Card title="Styled 布局片段">
      <Page style={{ height: 560, border: '1px solid #eee' }}>
        <Content>
          <FormPanel
            queryLoading={queryLoading}
            form={form}
            onQuery={onQuery}
            onReset={() => {
              alert('重置');
            }}
          >
            <Form.Item name="endDate" label="截止日期">
              <DatePicker />
            </Form.Item>
          </FormPanel>
        </Content>
      </Page>
    </Card>
  );
};
