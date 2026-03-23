import { Table } from 'antd';
import { useMemo } from 'react';
import { VList } from 'virtuallist-antd';
import './index.less';
//  获取有几级表头
const calculateDepth = (arr: any, depth = 0) => {
  let maxDepth = depth;
  if (arr !== null && arr !== undefined) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.children && obj.children.length > 0) {
        const childDepth = calculateDepth(obj.children, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    }
  }
  return maxDepth;
};
export const baseTable = (props: any) => {
  const {
    size = 'middle',
    bordered = true,
    pagination = false,
    rowKey = 'id',
    id = 'independent',
    height,
    isScroll = true,
    isVirtualTable,
  } = props;
  const vList = useMemo(
    () => VList({ vid: 'first', resetTopWhenDataChange: false, height }),
    [height],
  );
  return (
    <Table
      id={id}
      size={size}
      bordered={bordered}
      pagination={pagination}
      rowKey={rowKey}
      scroll={{ y: `${height}px` }}
      {...props}
      components={isVirtualTable ? vList : undefined}
    ></Table>
  );
};
export default baseTable;
