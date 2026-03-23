# 工具函数

这里是工具函数的总览页面。

## 分类

### 日期工具

日期相关的工具函数，基于 moment.js 实现。

- `getStartDate` - 获取指定时间单位前的起始日期
- `getEndDate` - 获取指定时间单位前的结束日期
- `getYearStartDate` - 获取指定年份的开始日期
- `getYearEndDate` - 获取指定年份的结束日期
- `getMonthEndDate` - 获取上个月最后一天
- `disabledDate` - 禁止选择今天及之后日期
- `disabledDateDay` - 禁止选择今天之后日期

### 树形工具

树形数据处理的工具函数。

- `queryItem` - 根据 id 查找树的某条数据
- `findKeyById` - 根据 key 查找树的某条数据
- `getTreeItem` - 获取扁平当前 item
- `getTreeName` - 获取 treeName
- `treeToArray` - tree 扁平化
- `findFirstLeafNodeInArray` - 递归查找树形数组中的第一个叶子节点
- `setDisabledByCondition` - 根据条件设置节点 disabled 属性

### 表格工具

表格数据处理相关的工具函数。

- `processingTableData` - 处理 table 数据
- `getRowSpan` - 判断某行是否要合并
- `tableColumns` - 表头高亮
- `DataProcess` - 拉平表头数组
- `getExpandedRowKeys` - 处理树形表格数据

### 其他工具

- `screenShotImage` - 截图功能
- `getHeight` - 根据屏幕高度计算
- `cloneData` / `cloneList` - 递归循环菜单

## 使用示例

```tsx | pure
import { getStartDate, treeToArray, screenShotImage } from '@yss-rui/utils';

// 获取去年的开始日期
const startDate = getStartDate(1, 'year'); // '2024-01-01'

// 树形数据扁平化
const flatList = treeToArray(treeData);

// 截图
const imageBase64 = await screenShotImage('dom-id');
```
