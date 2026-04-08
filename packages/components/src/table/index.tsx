import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import './index.less';
import type { VirtualTableProps } from './type';
import { sumLeafColumnWidths } from './utils';

/** 获取有几级表头（含 children 的复杂表头） */
const calculateDepth = (
  arr: ColumnsType<Record<string, unknown>> | undefined,
  depth = 0,
) => {
  let maxDepth = depth;
  if (arr !== null && arr !== undefined) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if ('children' in obj && obj.children && obj.children.length > 0) {
        const childDepth = calculateDepth(obj.children, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    }
  }
  return maxDepth;
};

/**
 * @param props
 * lineHeight 表头行高
 * paddingNum=表格上下的边距24*2
 */
export default (props: VirtualTableProps<Record<string, unknown>>) => {
  const {
    size = 'middle',
    bordered = false,
    pagination = false,
    rowKey = 'id',
    height,
    columns,
    dataSource,
    singleHeaderHeight = 40,
    paddingNum = 48,
    virtual = false,
    /** 虚拟表行高（px），需与样式中表体行高一致，默认 36 */
    listItemHeight: listItemHeightProp,
    isScroll: _isScroll,
    scroll: scrollFromProps,
    components: componentsFromProps,
    className,
    style,

    ...rest
  } = props;

  /** 表体行高（px），与样式变量 --orinui-table-body-row-height、virtual listItemHeight 一致 */
  const bodyRowPx = listItemHeightProp ?? 36;

  const mergedStyle: CSSProperties = {
    ...style,
    ['--orinui-table-header-cell-height' as string]: `${singleHeaderHeight}px`,
    ['--orinui-table-body-row-height' as string]: `${bodyRowPx}px`,
  };

  const paginationHeight = pagination ? 60 : 0;

  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const countHeight = () => {
    setTimeout(() => {
      let num = 0;
      const depth = calculateDepth(columns);
      if (columns) {
        // 加上1px的边框
        num += (depth + 1) * (singleHeaderHeight + 1);
      }
      setHeaderHeight(num);
    });
  };

  useEffect(countHeight, [columns, dataSource, singleHeaderHeight]);

  const scrollYNumber = useMemo(
    () =>
      Math.max(
        0,
        Math.floor(height - headerHeight - paddingNum - paginationHeight),
      ),
    [height, headerHeight, paddingNum, paginationHeight],
  );

  const mergedScroll = useMemo(() => {
    const y =
      scrollFromProps?.y !== undefined && scrollFromProps?.y !== null
        ? scrollFromProps.y
        : scrollYNumber;

    const hasExplicitX =
      scrollFromProps !== undefined &&
      scrollFromProps !== null &&
      scrollFromProps.x !== undefined &&
      scrollFromProps.x !== null;

    let x = scrollFromProps?.x;
    if (!hasExplicitX) {
      const w = sumLeafColumnWidths(columns);
      x = (w > 0 ? w : 'max-content') as typeof x;
    }

    if (!virtual) {
      if (dataSource?.length === 0) {
        // 没有数据时，不传递scroll，解决antd5表格没有数据时，且column中包含width时的宽度塌陷问题
        return {
          x,
        };
      }
      // return {
      //   ...scrollFromProps,
      //   y,
      // };
    }

    return {
      ...scrollFromProps,
      x,
      y,
    };
  }, [scrollFromProps, scrollYNumber, virtual, columns, dataSource]);

  return (
    <Table
      {...rest}
      {...(virtual ? { listItemHeight: bodyRowPx } : {})}
      size={size}
      className={['custom-table', className].filter(Boolean).join(' ')}
      style={mergedStyle}
      bordered={bordered}
      pagination={pagination}
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      scroll={mergedScroll}
      virtual={virtual}
      components={componentsFromProps}
    />
  );
};
