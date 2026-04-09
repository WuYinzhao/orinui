---
title: Table 表格
nav:
  title: 组件
  order: 11
group:
  title: 数据展示
  order: 1
toc: content
---

## 何时使用

- 在 **antd 5** `Table` 能力之上，统一表格区域高度、纵向滚动与样式（`custom-table`）。
- 需要固定**整体区域高度** `height`，由组件根据**表头层级**、**上下边距**、**是否分页**等估算内容区，并合并到 `scroll.y`。
- 数据量很大时，使用 antd 5 自带的 **`virtual`** 做行虚拟滚动，无需第三方虚拟列表库。
- 虚拟表格下，若未显式传入 `scroll.x`，横向宽度默认为**各叶子列宽度之和**（支持带 `children` 的多级表头）。

## 代码演示

### 基础表格

不开启虚拟滚动，适合行数较少、仅需固定高度与纵向滚动的场景。

<code src="./demos/table/basic.tsx"></code>

### 自定义 render

自定义渲染内容，需要对表格有定制化时使用。

<code src="./demos/table/custom-render.tsx"></code>

### 带分页

传入 antd 的 `pagination`（非 `false`）时，组件会为底部分页条预留约 60px，再计算 `scroll.y`。

<code src="./demos/table/pagination.tsx"></code>

### 左侧选中

左侧带选中框，适合需要勾选行的情况下使用。

<code src="./demos/table/check-table.tsx"></code>

### 表头高度与行高

- **`singleHeaderHeight`**：单层表头行高（px），默认 `40`。用于估算多级表头总高度 `(depth + 1) * singleHeaderHeight`，并写入根节点 CSS 变量 **`--orinui-table-header-cell-height`**，表头单元格样式与之对齐。
- **`listItemHeight`**：表体行高（px），默认 `36`。写入 CSS 变量 **`--orinui-table-body-row-height`**；开启 **`virtual`** 时同时作为 rc-table 的 **`listItemHeight`**，须与样式一致。

下列示例依次为：**默认值**、**普通表加大表头/行高**、**虚拟表紧凑表头/行高**。

<code src="./demos/table/header-row-height.tsx"></code>

### 虚拟列表

设置 `virtual`（或 `virtual={true}`）启用 antd 5 内置虚拟表格。请为列设置合适的 `width`，以便横向宽度与滚动行为稳定；未传 `scroll.x` 时，组件内部会按叶子列宽度汇总（见 `sumLeafColumnWidths`）。

<code src="./demos/table/virtual.tsx"></code>

### 多级表头 + 虚拟

通过 `columns` 的 `children` 配置分组表头；虚拟模式下同样依赖叶子列的 `width` 计算默认 `scroll.x`。

<code src="./demos/table/grouped-header.tsx"></code>

### 不传 scroll.x（虚拟表自动汇总宽度）

仅在 **`virtual === true`** 时，未显式设置 `scroll.x` 的情况下，组件会把 `scroll.x` 设为所有叶子列 `width`（及 `minWidth`）之和；和为 0 时回退为 `'max-content'`。下列示例包括：**完全不传 `scroll`**，以及**只传不含 `x` 的 `scroll`**（如 `scrollToFirstRowOnChange`），并演示左/右固定列在**不传 `scroll.x`** 时仍由自动宽度支撑横向滚动。

<code src="./demos/table/without-scroll-x.tsx"></code>

### 横向滚动与固定列

列较多时需要**横向滚动**：普通表格请在 `scroll` 中传入 **`scroll.x`**（数值、`'max-content'` 等与 antd 一致）；**固定列**在列上设置 `fixed: 'left' | 'right'`，并与 `scroll.x` 同时使用（与 [antd Table 固定列](https://ant.design/components/table-cn#components-table-demo-fixed-columns) 要求一致）。

虚拟表格下若未传 `scroll.x`，仍可由组件按叶子列宽自动汇总；固定列场景下也推荐显式传入 `scroll.x`，与列宽设计对齐。

下列示例上半部分为**普通表格**，下半部分为**虚拟表格**，均包含左固定「序号」、右固定「操作」与中间可横向滚动的数据列。

<code src="./demos/table/scroll-fixed.tsx"></code>

### TableUtils

<code src="./demos/table/utils.tsx"></code>

## API

在 [antd Table](https://ant.design/components/table-cn) 的 `TableProps` 上扩展了高度与虚拟滚动相关字段。**`height` 为必填**（用于计算 `scroll.y`）。其余属性与 antd 5 一致，详见官方文档。

### Table（VirtualTableProps）

| 属性               | 说明                                                                                                    | 类型      | 默认值   |
| ------------------ | ------------------------------------------------------------------------------------------------------- | --------- | -------- |
| height             | 表格**整体区域**高度（px），用于计算纵向滚动区域 `scroll.y`（扣除表头高度、`paddingNum`、分页条占位等） | `number`  | （必填） |
| virtual            | 是否启用 antd 5 **内置**虚拟表格（行虚拟滚动）                                                          | `boolean` | `false`  |
| singleHeaderHeight | 单层表头行高（px），参与表头总高估算，并写入 `--orinui-table-header-cell-height`                        | `number`  | `40`     |
| listItemHeight     | 表体行高（px），写入 `--orinui-table-body-row-height`；`virtual` 时兼为 rc-table 行高                   | `number`  | `36`     |
| paddingNum         | 从 `height` 中扣除的**上下边距**总和（px），如容器内边距                                                | `number`  | `48`     |
| isScroll           | 预留字段，与传入的 `scroll` 合并策略以源码为准                                                          | `boolean` | -        |
| id                 | 可选，表格根节点标识                                                                                    | `string`  | -        |

**滚动行为说明：**

- **`scroll.y`**：若未在 `scroll` 中传入 `y`，则由组件根据 `height`、表头层数、`paddingNum`、是否分页等计算；若你显式传入 `scroll.y`，则以传入值为准。
- **`scroll.x`**：
  - **`virtual === false`（普通表格）**：组件**不会**自动写入 `scroll.x`，需要横向滚动或**固定列**时，请自行传入 `scroll.x`（或 `'max-content'` 等），否则无法形成横向滚动容器。
  - **`virtual === true`（虚拟表格）**：若未在 `scroll` 中传入 `x`，则取所有**叶子列** `width`（及 `minWidth` 兜底）之和；若为 0 则回退为 `'max-content'`。支持带 `children` 的列配置。使用**固定列**时仍建议显式设置 `scroll.x`。
- **固定列**：在列配置中设置 `fixed: 'left'` / `fixed: 'right'`，并保证 `scroll.x` 大于表格可视宽度，行为与 antd 5 一致。
- 组件默认：`size="middle"`、`bordered={true}`、`pagination={false}`、`rowKey="id"`，均可被覆盖。
- **表头/行高**：`singleHeaderHeight`、`listItemHeight` 会通过根节点 **CSS 变量**（`--orinui-table-header-cell-height`、`--orinui-table-body-row-height`）驱动 `index.less` 中的表头与表体高度；若外层覆盖 `style`，请保留或自行合并这两个变量。

### TableUtils

| 方法                | 说明                                                               |
| ------------------- | ------------------------------------------------------------------ |
| getCellColor        | 按 `level` 返回单元格背景色样式（如 `'1'`、`'2'`）                 |
| getCellText         | 按 `level` 返回加粗等格式化单元格内容或纯文本                      |
| sumLeafColumnWidths | 递归汇总叶子列宽度（工具方法，虚拟表默认 `scroll.x` 逻辑与此一致） |
