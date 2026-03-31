import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useState } from 'react';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);

import type { Dayjs } from 'dayjs';
import { DateRangeProps } from './type';
import {
  getHalfYearDay,
  getInitValue,
  getLastYearDay,
  getQuarterDay,
} from './utils';
const selectOptions = [
  { value: 'custom', label: '指定日' },
  { value: '1', label: '上季末' },
  { value: '3', label: '上半年末' },
  { value: '6', label: '上年末' },
];
const initDate = getInitValue();

export default (props: DateRangeProps) => {
  const {
    id,
    onChange,
    optionsValue = ['1', '3', '6'],
    disabledDate = (current) => {
      return !!current && current > dayjs().subtract(1, 'days').endOf('day');
    }, // 禁用日期
    value = { selectVal: 'custom', ...initDate },
    format = 'YYYY-MM-DD',
    picker = 'date',
  } = props;
  const { selectVal, ...dateValue } = value;
  const useSelectOptions = selectOptions.filter((i) =>
    ['custom', ...optionsValue].includes(i.value),
  );
  const [dateDisabled, setDateDisabled] = useState(false);
  useEffect(() => {
    setDateDisabled(selectVal !== 'custom');
  }, [selectVal]);
  const onDateChange = (val: Dayjs | null) => {
    if (!val) return;
    const date = val.endOf(picker);
    onChange?.({ date: date, dateStr: date.format(format), selectVal });
  };
  const onSelectChange = (val: string) => {
    let newValue = dateValue;
    if (val === '1') {
      // 获取上季末
      newValue = getQuarterDay('YYYY-MM-DD');
    } else if (val === '3') {
      // 获取上半年末
      newValue = getHalfYearDay('YYYY-MM-DD');
    } else if (val === '6') {
      // 获取上年末
      newValue = getLastYearDay('YYYY-MM-DD');
    }
    onChange?.({ selectVal: val, ...newValue });
  };
  return (
    <div style={{ display: 'flex' }} id={id}>
      <Select
        options={useSelectOptions}
        style={{ width: '100px' }}
        value={selectVal}
        onChange={onSelectChange}
      ></Select>
      <div>
        <DatePicker
          disabled={dateDisabled}
          picker={picker}
          style={{ width: '170px' }}
          disabledDate={disabledDate}
          showToday={false}
          allowClear={false}
          value={dateValue.date}
          onChange={onDateChange}
        />
      </div>
    </div>
  );
};
