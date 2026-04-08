---
title: 指南
nav:
  title: 指南
  order: 0
---

# 指南

本页介绍如何在业务中接入 orinui，以及为 **AI 辅助编程工具**（Cursor、Copilot、本地 Agent 等）准备的 **`llms.txt` 文档索引**。

## 面向 AI 与开发者的 `llms.txt`

### 是什么、解决什么问题

在业务项目里集成 `@orinui/components` 等包时，模型或助手往往需要同时知道：**怎么装依赖、peer 要求、如何 import、每个组件的文档在哪**。若只依赖仓库内零散路径或让模型「猜」API，容易产生版本混用（例如 antd 4/5）、漏装 peer、或读到过时说明。

**`llms.txt`** 是放在**仓库根目录**的 Markdown 索引文件（命名与 [llmstxt.org](https://llmstxt.org/) 及 [Ant Design 的 llms.txt](https://ant.design/llms.txt) 惯例一致），专门为 **人类开发者 + LLM** 设计，用于：

- **先索引、再深读**：上半部分固定说明安装、peer、最小用法、与 **Ant Design 5** 的关系；下半部分 **Navigation** 按文档站侧栏列出各页的**可抓取链接**（本地为 `docs/**/*.md` 相对路径，发布前可换为文档站绝对 URL）。
- **与 dumi 文档同源**：内容由脚本根据 `docs/` 与 `.dumirc.ts` 侧栏生成，侧栏或文档变更后重新生成即可，避免与站点结构脱节。

相关文件共 **两份**，由 `pnpm run generate:llm` 生成：

| 文件                | 作用                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **`llms.txt`**      | **主索引**（推荐优先提供给 AI 或放在上下文中）。                                                                          |
| **`llms-full.txt`** | 可选：按侧栏顺序拼接各文档正文，并附「包导出附录」；体积大；可用 `node scripts/generate-llm-txt.mjs --no-full` 跳过生成。 |

### 文件位置与浏览器访问（`public/`）

生成脚本会写入**两处内容相同**的副本（勿手改 `public/` 内文件）：

1. **仓库根目录**（`llms.txt`、`llms-full.txt`）：便于在编辑器、Git、工具链中直接打开，与常见「根目录 `llms.txt`」习惯一致。
2. **`public/` 目录**：构建产物会把其中文件拷到站点根（如 `docs-dist/llms.txt`）。**本地 `pnpm dev` 时**，默认会把未知路径交给 SPA，直接访问 `/llms*.txt` 往往得到 **HTML 壳子**而非纯文本；项目在 **`.dumirc.ts`** 里用 `chainWebpack` 注入了 `setupMiddlewares`，对 `/llms.txt`、`/llms-full.txt` 优先返回 `public/` 中的 **`text/plain`**。修改该配置或首次生成 `public/` 后请**重启** `pnpm dev`。

| 文件     | 在浏览器中打开                                                              |
| -------- | --------------------------------------------------------------------------- |
| 主索引   | <a href="/llms.txt" target="_blank" rel="noreferrer">llms.txt</a>           |
| 全文聚合 | <a href="/llms-full.txt" target="_blank" rel="noreferrer">llms-full.txt</a> |

**可直接复制到地址栏或 AI IDE 的路径**（本地开发端口以终端为准，默认多为 `8000`）：

- `http://localhost:8000/llms.txt`
- `http://localhost:8000/llms-full.txt`

正式部署后，将主机名换成你的文档站域名即可，例如 `https://你的域名/llms-full.txt`。

在 **Cursor / IDE** 中也可直接打开仓库根目录下的 `llms.txt`、`llms-full.txt`；从 **`docs/`** 看仓库根为 `../llms.txt`、`../llms-full.txt`。

若需 **`llms.txt` 内 Navigation** 使用可抓取的绝对 URL，可设置环境变量 **`ORINUI_LLMS_DOCS_ORIGIN`** 后执行 `pnpm run generate:llm`（见下文）。

### 在仓库中的位置与更新方式

- **输出位置**：每次生成会更新仓库根目录的 `llms.txt` / `llms-full.txt`，并**同步**到 `public/llms.txt`、`public/llms-full.txt`（供 `pnpm dev` / `pnpm run docs:build` 在浏览器中访问）。`pnpm run docs:build` 已内置先执行 `generate:llm`，避免构建站点时缺少静态文件。
- **生成 / 刷新**（文档或 `.dumirc.ts` 侧栏有改动时执行）：

```bash
pnpm run generate:llm
```

脚本为 `scripts/generate-llm-txt.mjs`，静态说明模板为 `scripts/llm-header.txt`；**请勿手工编辑** `llms.txt` 中带 `AUTO-GENERATED` 标记的区块，**勿手工编辑** `public/` 下同名文件（均由脚本覆盖）。

- **仅生成索引、不生成全文**（减小体积）：

```bash
node scripts/generate-llm-txt.mjs --no-full
```

- **发布文档站时**：若希望索引内链接可被公网 HTTP 抓取（便于 Cursor `@Docs`、爬虫等），设置环境变量 **`ORINUI_LLMS_DOCS_ORIGIN`** 为文档站 origin（无末尾斜杠），再运行上述命令，例如：

```bash
ORINUI_LLMS_DOCS_ORIGIN=https://your-docs.example.com pnpm run generate:llm
```

### 推荐给 AI 的使用方式

1. **将 `llms.txt` 整段或前半部分（到 Navigation 之前）作为系统/项目上下文**，便于模型掌握安装与 antd 5 约束。
2. **需要某一组件细节时**，按 Navigation 中的链接**再拉取**对应 `docs/components/*.md`（或线上同路径页面），而不是只依赖附录里的源码路径表。
3. **`llms-full.txt`** 仅在需要「一次读多页」时使用；其中附录为各包 `index.ts` 导出与源码路径，**面向库维护/校验**，业务集成以组件文档为准。

### 与本文档站的关系

- 本 **指南**（当前页）面向人类读者，讲解概念与操作步骤。
- **`llms.txt`** 更偏 **机器可消费的索引 + 稳定结构**（简介 → Navigation → 链接表）；二者互补：开发时以本站为主，给 AI 配上下文时以 `llms.txt` 为主。

---

## 快速接入（概要）

更完整的安装、peer 与代码示例见仓库根目录 **`llms.txt`** 正文，或查阅各包 `package.json` 与组件文档。

```bash
pnpm add @orinui/components
```

业务侧需自行安装并对齐 **React 18+**、**antd 5.x**、以及组件实际用到的 **dayjs**、**styled-components**、**echarts** 等（与 `packages/components/vite.config.ts` 中 `external` 一致）。

```tsx
import { Table } from '@orinui/components';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

export default function Page() {
  return (
    <ConfigProvider locale={zhCN}>
      <Table columns={[]} dataSource={[]} height={400} />
    </ConfigProvider>
  );
}
```

具体 API、演示与注意事项请从侧边栏进入 **组件**、**Hooks**、**工具** 等文档。
