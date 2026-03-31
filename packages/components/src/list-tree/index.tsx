import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import type { ListTreeCheckboxOption, ListTreeProps } from './type';
/*
props父组件传值
width：左侧菜单宽度
checkboxOption  data数据
*/
export default (props: ListTreeProps) => {
  const {
    checkboxOption,
    defaultValue,
    fieldNames = { id: 'id', name: 'name' },
    leftCheckChange,
    isSingle = true,
  } = props;
  const { id, name } = fieldNames;
  const [values, setValues] = useState<Array<string | number>>([]);
  useEffect(() => {
    if (defaultValue?.length) {
      setValues(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    let res = values.map((item) => ({
      [id]: item,
      [name]: checkboxOption.find((item2) => item2[id] === item)?.[name],
    })) as ListTreeCheckboxOption[];
    leftCheckChange && leftCheckChange(res);
  }, [values]);
  const onChange = (val: Array<string | number>) => {
    if (!val.length) return setValues([]);
    if (isSingle) {
      setValues([val[val.length - 1]]);
    } else {
      setValues(val);
    }
  };
  return (
    <div className="checkbox-content-tree">
      <Checkbox.Group onChange={onChange} value={values}>
        {checkboxOption.map((item) => (
          <Checkbox
            key={String(item[id])}
            value={item[id] as string | number}
            disabled={Boolean(item.disabled)}
          >
            {item[name]}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
};
