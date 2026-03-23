---
title: 树形工具
nav:
  title: 工具
  order: 3
group:
  title: 树形
  order: 2
---

# 树形工具

树形数据处理的工具函数。

## 函数

### queryItem

根据id查找树的某条数据。

```typescript
queryItem(data: any[], id: number | string, queryKey?: string): any
```

### findKeyById

根据key查找树的某条数据。

```typescript
findKeyById(data: any[], key: string, id: any): any
```

### getTreeItem

获取扁平当前item。

```typescript
getTreeItem(list: any[], val: any): any
```

### getTreeName

获取树节点的name。

```typescript
getTreeName(list: any[], val: any): any
```

### treeToArray

树形数据扁平化。

```typescript
treeToArray(tree: any[]): any[]
```

### findFirstLeafNodeInArray

递归查找树形数组中的第一个叶子节点。

```typescript
findFirstLeafNodeInArray(treeArray: any[], childrenKey?: string): any
```

### setDisabledByCondition

递归遍历树形数组并根据条件函数设置disabled属性。

```typescript
setDisabledByCondition(
  treeArray: any[],
  conditionFn: (node: any) => boolean,
  childrenKey?: string
): any[]
```

## 代码演示

<code src="./demos/tree.tsx"></code>
