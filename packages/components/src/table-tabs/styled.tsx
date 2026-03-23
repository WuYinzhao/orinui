import styled from 'styled-components';

export const TabsContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px 2px rgba(96, 97, 112, 0.12);
  height: 48px;
  width: 100%;
  z-index: 10;
  padding: 0 24px;
  .ant-tabs-nav {
    height: 100%;
  }
  .ant-tabs-tab {
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    color: #04042c;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
  }
  .ant-tabs-tab-disabled {
    color: rgba(0, 0, 0, 0.25);
  }
`;
