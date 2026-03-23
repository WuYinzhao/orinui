---
title: 日期工具
nav:
  title: 工具
  order: 3
group:
  title: 日期
  order: 1
---

# 日期工具

基于 moment.js 实现的日期处理工具函数。

## 常量

### unitOption
单位选项列表。

### DateOptions
日期选项列表（日/周/月/季/半年/年）。

### moneyList
金额单位列表（元/万元/亿元/万亿）。

## 函数

### getStartDate

获取指定时间单位前的起始日期。

```typescript
getStartDate(num?: number, unit?: string): string
```

**参数：**
- `num` - 时间单位的数量，默认 0
- `unit` - 时间单位（year/month/day等），默认 'year'

**返回：**
- 格式为 'YYYY-MM-DD' 的日期字符串

### getEndDate

获取指定时间单位前的结束日期。

```typescript
getEndDate(num?: number, unit?: string): string
```

### getYearStartOfDate

获取指定年份的开始日期。

```typescript
getYearStartOfDate(num?: number): string
```

### getYearEndDate

获取指定年份的结束日期。

```typescript
getYearEndDate(num?: number): string
```

### getMonthEndDate

获取上个月的最后一天。

```typescript
getMonthEndDate(num?: number): string
```

### disabledDate

禁止选择今天及今天之后日期（用于 antd DatePicker）。

```typescript
disabledDate(current: moment.Moment): boolean
```

### disabledDateDay

禁止选择今天之后日期。

```typescript
disabledDateDay(current: moment.Moment): boolean
```

## 代码演示

<code src="./demos/date.tsx"></code>
