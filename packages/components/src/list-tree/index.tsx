import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import outdent from '../assets/images/outdent.svg';
import './index.less';
/*
props父组件传值
width：左侧菜单宽度
checkboxOption  data数据
*/
export default (props: any) => {
  const {
    width = 280,
    checkboxOption,
    defaultValue,
    fieldNames = { id: 'id', name: 'name' },
    leftCheckChange,
    isSingle = true,
  } = props;
  const { id, name } = fieldNames;
  const [collapsed, setCollapsed] = useState(false);
  const [values, setValues] = useState<any[]>([]);
  useEffect(() => {
    if (defaultValue?.length) {
      setValues(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    let res = values.map((item) => ({
      [id]: item,
      [name]: checkboxOption.find((item2: any) => item2[id] === item)[name],
    }));
    leftCheckChange && leftCheckChange(res);
  }, [values]);
  const onChange = (val: any[]) => {
    if (!val.length) return setValues([]);
    if (isSingle) {
      setValues([val[val.length - 1]]);
    } else {
      setValues(val);
    }
  };
  return (
    <div
      id="checkbox-left-com"
      className={collapsed ? 'complex-tree-shrink' : ''}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        flex: `0 0 ${width}px`,
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
        style={{
          display: collapsed ? 'none' : 'block',
        }}
        className="checkboxContent"
      >
        <Checkbox.Group onChange={onChange} value={values}>
          {checkboxOption.map((item: any) => (
            <Checkbox key={item[id]} value={item[id]} disabled={item.disabled}>
              {item[name]}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>
    </div>
  );
};
