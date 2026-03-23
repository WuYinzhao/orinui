import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';
import { SingleHeader, TableContainer } from './styled';
/*
tableTitle 表格TITLE
downloadFun 下载方法
*/
export const OperateTable = (props: any) => {
  const { height = '100%', children, tableTitle, downloadFun } = props;
  return (
    <TableContainer style={{ height: height + 'px' }}>
      {(tableTitle || downloadFun) && (
        <SingleHeader>
          <div>
            {tableTitle && <div className="tableTitle">{tableTitle}</div>}
          </div>
          <div>
            {downloadFun && (
              <span className="downloadBox" onClick={downloadFun}>
                <DownloadOutlined />
                下载
              </span>
            )}
          </div>
        </SingleHeader>
      )}
      {children}
    </TableContainer>
  );
};
export default OperateTable;
