import { Styled } from '@yss-rui/components';
import { Card } from 'antd';

export default () => {
  const { LayoutDiv, Content, Header } = Styled();

  return (
    <Card title="Styled 布局片段">
      <LayoutDiv style={{ height: 160, border: '1px solid #eee' }}>
        <Header>页头区域</Header>
        <Content style={{ padding: 16 }}>内容区域</Content>
      </LayoutDiv>
    </Card>
  );
};
