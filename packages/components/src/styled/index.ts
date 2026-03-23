import styled from 'styled-components';

export const LayoutDiv = styled.div`
  display: flex;
  height: 100%;
`;
export const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  position: relative;
  width: 100%;
  background: #ffffff;
  padding: 16px 24px 0;
`;

export const ContentForm = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  background: #fff;
`;
export const ContentLeft = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  .ant-form-item {
    margin-right: 20px;
  }
`;

export const ContentRight = styled.div`
  position: relative;
`;

export const ContainerContent = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
  background: #fff;
`;

export const TableContent = styled.div`
  position: relative;
`;

export const EchartsContent = styled.div`
  width: 100%;
  display: flex;
`;

export default () => {
  return {
    LayoutDiv,
    Content,
    Header,
    ContentForm,
    ContentLeft,
    ContentRight,
    ContainerContent,
    TableContent,
    EchartsContent,
  };
};
