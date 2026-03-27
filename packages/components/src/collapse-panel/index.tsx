import { useState } from 'react';
import outdent from '../assets/images/outdent.svg';
import './index.less';
/*
props父组件传值
width：左侧菜单宽度
treeData  data数据
title prohibitSubordinates是多选（父子不关联）
*/
export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const { width = 280, children } = props;

  return (
    <div
      id="collapse-panel"
      className={collapsed ? 'complex-tree-shrink' : ''}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        flex: `0 0 ${width}px`,
        height: '100%',
      }}
    >
      <div className="collapsed" onClick={() => setCollapsed(!collapsed)}>
        <img
          src={outdent}
          style={{
            transform: collapsed ? 'rotate(180deg)' : '',
          }}
          alt=""
        />
      </div>
      <div
        className="collapse-panel-content"
        style={{ display: collapsed ? 'none' : 'block' }}
      >
        {children}
      </div>
    </div>
  );
};
