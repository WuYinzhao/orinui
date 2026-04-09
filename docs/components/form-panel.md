---
title: form布局组件
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 4
description: 布局组件
toc: content
---

## 何时使用

- form 按照表单内容和按钮进行自适应。

## 代码演示

### 基础用法

<code src="./demos/form-panel/basic.tsx"></code>

### 加载状态

`queryLoading` 为 `true` 时，整体包裹 [Spin](https://ant.design/components/spin-cn)，适合查询请求进行中。

<code src="./demos/form-panel/form-loading.tsx"></code>

## API

在 [antd Form](https://ant.design/components/form-cn) 的 `FormProps` 上扩展查询区行为。组件内默认 `layout="inline"`；未列出的属性会透传给 `Form`（写在后面的会覆盖默认值，如传入 `layout` 可改为非行内布局），例如 `initialValues`、`name` 等。

### FormPanel

| 属性           | 说明                                                                      | 类型                    | 默认值  |
| -------------- | ------------------------------------------------------------------------- | ----------------------- | ------- |
| form           | antd `Form` 实例；点击「查询」时会 `validateFields`，通过后调用 `onQuery` | `FormInstance`          | -       |
| children       | 表单项等内容，置于 `Form` 内                                              | `ReactNode`             | -       |
| onQuery        | 校验通过后回调，参数为表单字段值                                          | `(values: any) => void` | -       |
| onReset        | 点击「重置」时回调（仅清空等逻辑需自行在回调中处理）                      | `() => void`            | -       |
| queryLoading   | 是否显示加载中（外层 `Spin`）                                             | `boolean`               | `false` |
| useResetButton | 是否渲染「重置」按钮；为 `false` 时仅保留查询侧占位宽度                   | `boolean`               | `true`  |
| ...FormProps   | 其余与 [Form](https://ant.design/components/form-cn) 一致                 | `FormProps`             | -       |
