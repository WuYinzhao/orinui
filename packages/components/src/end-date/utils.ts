import moment from 'moment';
import dayjs from 'dayjs';
export const assignDateValidate = (
  date: string,
): {
  state: '' | 'error' | 'warning' | undefined;
  message: string;
} => {
  return {
    state: date ? '' : 'error',
    message: date ? '' : '请选择日期！',
  };
};

export const getInitValue = () => {
  const endDateInit = dayjs(dayjs().subtract(2, 'M')).endOf('M').format('YYYY-MM-DD');
  return endDateInit;
};
//获取上季末
export const getQuarterDay = (format: string): string => {
  const now = moment();
  return now
    .quarter(now.quarter() - 1)
    .endOf('quarter')
    .format(format);
};
//获取上半年末
export const getHalfYearDay = (format: string): string => {
  let now = moment();
  const halfYearMonth = 5;
  const month = now.month();
  return now
    .set({ month: halfYearMonth < month ? halfYearMonth : -1 })
    .endOf('month')
    .format(format);
};
//获取上年末
export const getLastYearDay = (format: string): string => {
  const now = moment();
  return moment(
    now
      .year(now.year() - 1)
      .endOf('year')
      .valueOf(),
  ).format(format);
};
export default {
  assignDateValidate,
  getInitValue,
  getQuarterDay,
};
