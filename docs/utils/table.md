---
title: 表格工具
nav:
  title: 工具
  order: 3
group:
  title: 表格
  order: 3
---

# 表格工具

表格数据处理相关的工具函数。

## 函数

### processingTableData

处理table数据。

```typescript
processingTableData(data: any[], key?: string): any[]
```

### getRowSpan

判断某行是否要合并。

```typescript
getRowSpan(data: any[], colNameList: string[]): any[]
```

### tableColumns

表头高亮。

```typescript
tableColumns(data: any[], val: any): any[]
```

### DataProcess

拉平表头数组。

```typescript
DataProcess(data: any[], initAry?: any[]): any[]
```

### getExpandedRowKeys

处理树形表格数据，获取需要展开的行keys。

```typescript
getExpandedRowKeys(data: any[], initAry?: any[], name?: string): any[]
```

## 代码演示

<code src="./demos/table.tsx"></code>
