import styled from 'styled-components';

export const TableContainer = styled.div`
  margin: 24px;
`;
export const SingleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  div {
    font-size: 14px;
    font-family: SourceHanSansCN-Medium;
    .tableTitle {
      font-size: 16px;
      color: #04042c;
    }
    .downloadBox {
      color: #1686eb;
      cursor: pointer;
      span {
        margin-right: 4px;
      }
    }
  }
`;
