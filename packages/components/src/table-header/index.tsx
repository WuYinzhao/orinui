import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';
import { Header, UnitList } from './styled';
/*
tableName 表格name
unit 单位
downloadFun 下载方法
*/
export const OperateTable = (props: any) => {
  const { unitChar, unit, downloadFun, unitOption, unitFun } = props;
  return (
    <Header>
      <div className="left">
        {downloadFun && (
          <span className="downloadBox" onClick={downloadFun}>
            <DownloadOutlined />
            下载
          </span>
        )}
      </div>
      <div className="right">
        {unitChar || unitOption ? <span>单位：{unitChar}</span> : ''}
        {unitOption ? (
          <UnitList>
            {unitOption.map((item: any, index: number) => {
              return (
                <span
                  className={item.unit === unit ? 'active' : ''}
                  key={index}
                  onClick={() => {
                    unitFun && unitFun(item.unit);
                  }}
                >
                  {item.name}
                </span>
              );
            })}
          </UnitList>
        ) : (
          ''
        )}
      </div>
    </Header>
  );
};
export default OperateTable;
