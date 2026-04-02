import styled from 'styled-components';

export const FormContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  background: #fff;
  padding: 16px 24px 0;
  & > .ant-form {
    padding: 0px;
  }
  & > .ant-form-inline .ant-form-item-with-help {
    margin-bottom: 0px;
  }
  & > .ant-form-inline .ant-form-item {
    margin-bottom: 16px;
  }
`;

export const ButtonPlaceholder = styled.div`
  height: 32px;
  margin-bottom: 16px;
`;

export const ButtonGroup = styled.div`
  position: absolute;
  bottom: 16px;
  right: 12px;
  & > button {
    margin-right: 12px;
  }
`;
