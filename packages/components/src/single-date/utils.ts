import dayjs, { Dayjs } from 'dayjs';
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

export const getInitValue = (
  forward: number = 2,
  format: string = 'YYYY-MM-DD',
): { date: Dayjs; dateStr: string } => {
  const date = dayjs(dayjs().subtract(forward, 'M')).endOf('M');
  return {
    date: date,
    dateStr: date.format(format),
  };
};
//获取上季末
export const getQuarterDay = (
  format: string,
): { date: Dayjs; dateStr: string } => {
  const date = dayjs()
    .quarter(dayjs().quarter() - 1)
    .endOf('quarter');
  return {
    date: date,
    dateStr: date.format(format),
  };
};
//获取上半年末
export const getHalfYearDay = (
  format: string,
): { date: Dayjs; dateStr: string } => {
  const halfYearMonth = 5;
  let date = dayjs()
    .month(halfYearMonth < dayjs().month() ? halfYearMonth : -1)
    .endOf('month');

  return { date: date, dateStr: date.format(format) };
};
//获取上年末
export const getLastYearDay = (
  format: string,
): { date: Dayjs; dateStr: string } => {
  const date = dayjs()
    .year(dayjs().year() - 1)
    .endOf('year');
  return { date: date, dateStr: date.format(format) };
};
export default {
  assignDateValidate,
  getInitValue,
  getQuarterDay,
};
