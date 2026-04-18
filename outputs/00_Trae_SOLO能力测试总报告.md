# Trae SOLO 能力测试 — 总报告

> 测试日期：2026-04-18
> 测试版本：Trae SOLO v1.0.18（2026-03-26 构建）
> 测试平台：macOS (darwin-arm64)
> 信息来源：系统配置/提示词 + 官方网页 + 实际调用验证

---

## 一、版本与平台

| 项目 | 值 | 信息来源 |
|------|------|---------|
| 当前版本 | 1.0.18 | version.json |
| 构建日期 | 2026-03-26 | version.json |
| 支持平台 | **Windows + macOS**（非 macOS only） | 官网 trae.cn/trae.ai |
| Linux 支持 | ❌ 不支持 | 官方资料无提及 |
| 产品形态 | 独立桌面端 + 网页端（2026-03-31 起脱离 IDE） | 官方公告 |
| 中国版 | 完全免费 | trae.cn |
| 国际版 | 限时免费体验 | trae.ai |

---

## 二、Q1：模式体系与场景分析

### 2.1 模式体系（两层嵌套结构）

```
Trae SOLO 独立端
├── Code 模式（开发者）
│   ├── Plan 功能（先规划后执行，可开关）
│   └── Spec 功能（需求规格化，仅 Code 模式有）
└── MTC 模式（More Than Code，非开发者）
    └── Plan 功能（先规划后执行，可开关）
```

| 模式/功能 | 层级 | 目标用户 | 核心能力 |
|-----------|------|---------|---------|
| **Code** | 顶层模式 | 开发者 | 编码执行、脚本运行、自动化、Git 工作流 |
| **MTC** | 顶层模式 | 非开发者（PM/分析师/运营/学生） | 文档/表格/报告/PPT/数据处理 |
| **Plan** | 功能级 | 所有用户 | 先规划后执行，经用户确认再逐步实施 |
| **Spec** | 功能级 | 仅 Code 模式 | 需求规格化，生成 spec/tasks/checklist |

> **Explore 不是用户可选模式**，经多源交叉验证确认为子代理类型。

### 2.2 六大应用场景

| 编号 | 模式 | 行业 | 岗位 | 人员类别 | 任务 |
|------|------|------|------|---------|------|
| C1 | Code | 互联网AI软件 | 初级前端开发实习生 | 开发者 | React + Tailwind CSS 搭建电商商品列表页 |
| C2 | Code | 生产制造业 | 车间设备维修工 | 纯体力劳动者 | Python 脚本读取设备日志识别异常温度 |
| C3 | Code | 服务业 | 快递站点分拣员 | 纯体力劳动者 | 批量重命名脚本归档快递面单图片 |
| M1 | MTC | 服务业 | 咖啡店兼职大学生 | 学生办公族 | 手写销售记录图片整理成 Excel + 趋势图 |
| M2 | MTC | 生产制造业 | 仓库管理员 | 纯体力劳动者 | 多份 PDF 入库单提取到统一 Excel 模板 |
| M3 | MTC | 互联网AI软件 | 运营专员 | 学生办公族 | 用户反馈 Excel 生成月度运营汇报 PPT |

> 详细场景文档：[Q1_模式与场景分析.md](Q1_模式与场景分析.md)

---

## 三、Q2：子代理体系

### 3.1 三类子代理

| 子代理 | 类型 | 可用工具 | 写入权限 | 可并行 |
|--------|------|---------|---------|--------|
| **Explore Subagent** | 探索检索 | LS/Read/Glob/Grep/WebSearch/WebFetch/浏览器 | ❌ 只读 | ✅ 默认可并行 |
| **Plan Subagent** | 方案规划 | LS/Read/Glob/Grep/WebSearch/WebFetch/浏览器 | ❌ 只读 | ✅ 可并行 |
| **Coding Subagent** | 编码执行 | 全部工具（含 Write/Edit/DeleteFile/RunCommand） | ✅ 可写入 | ⚠️ 仅接口冻结+改动不重叠时 |

### 3.2 并行规则摘要

- **触发条件**：可拆分 + 弱依赖 + 收益≥30% + 一次性闭环 + 写入不冲突（5 条同时满足）
- **禁止并行**：强依赖链 / 需求未澄清 / 写入冲突 / 需频繁交互 / SSOT 未对齐
- **并行上限**：默认 2 个，最多 3 个
- **安全组合**：Explore+Explore > Plan+Plan > Explore+Plan（纯只读最安全）

### 3.3 本次实际验证

| 阶段 | 并行方式 | 结果 |
|------|---------|------|
| 信息收集 | 3 路 Explore 并行 | ✅ 成功 |
| 执行阶段 | 2 路 Coding 并行（Q1+Q4） | ✅ 成功（不同输出目录） |

> 详细文档：[Q2_子代理体系.md](Q2_子代理体系.md)

---

## 四、Q3：工具完整清单

### 4.1 工具统计

| 类别 | 数量 | 说明 |
|------|------|------|
| 原生内置工具 | ~38 个 | 文件操作(7) + 命令执行(3) + 浏览器(19) + 网络(2) + 交互(4) + 辅助(3) |
| 内置 Skill | 7 个 | docx/pptx/xlsx/pdf/web-dev/web-artisan/web-design-docs |
| 用户安装 Skill | 57 个活跃 | 图像生成/前端/数据分析/知识管理/思维框架等 |
| MCP 工具 | 19 个 | integrated_browser |
| **合计** | **~121 个** | |

### 4.2 工具分类速览

**原生内置工具**：LS / Read / Write / SearchReplace / Glob / Grep / DeleteFile / RunCommand / CheckCommandStatus / StopCommand / WebSearch / WebFetch / Task / Skill / AskUserQuestion / NotifyUser / TodoWrite / GenerateImage / OpenPreview / run_mcp + 19 个浏览器工具

**内置 Skill**：docx / pptx / xlsx / pdf / web-dev(trae版) / web-dev(code版) / web-artisan

**用户安装 Skill（按功能分类）**：
- 图像/视频生成：byted-seedream-image-generate / byted-seedance-video-generate
- 文档/设计：slides / canvas-design / algorithmic-art / formula-render-export
- 数据分析：data-analysis / chart-visualization / consulting-analysis / report-generator / hook-analyzer
- 前端开发：frontend-design / frontend-skill / web-artifacts-builder / web-design-guidelines / shadcn / vercel-composition-patterns / vercel-react-best-practices / vercel-react-native-skills / theme-factory / brand-guidelines
- 工程实践：brainstorming / writing-plans / executing-plans / test-driven-development / git-commit / gh-cli / mcp-builder / electron / agent-browser / security-best-practices / redis-development / figma
- 知识管理：doc-coauthoring / notion-knowledge-capture / notion-meeting-intelligence / notion-research-documentation / notion-spec-to-implementation / notion-cli / obsidian-cli / obsidian-markdown / obsidian-bases / json-canvas / defuddle / internal-comms
- 思维框架：forrester-perspective / pritsker-perspective / taguchi-perspective / tim-cook-perspective / mentor-template-iteration
- 其他：dogfood / alipay-payment-integration / screenshot

> 详细文档：[Q3_工具清单.md](Q3_工具清单.md)

---

## 五、Q4：文件预览测试

### 5.1 测试结果总览

| 指标 | 数值 |
|------|------|
| 测试格式数 | 22 种 |
| 创建成功 | 22/22（100%） |
| AI 可读取 | 19/22（86.4%） |
| AI 不可读取 | 3/22（WEBP/MP4/MP3） |

### 5.2 按格式分类结果

| 类别 | 格式 | 创建方式 | AI可读 | 预览方式 |
|------|------|---------|--------|---------|
| 网页 | .html | 本地创建 | ✅ | 文本读取 + OpenPreview |
| 文档 | .md | 本地创建 | ✅ | 文本读取 |
| 文档 | .pdf | Python 生成 | ✅ | 文本读取 |
| 文档 | .docx | Python 生成 | ✅ | 文本读取 |
| 演示 | .pptx | Python 生成 | ✅ | 文本读取 |
| 表格 | .xlsx | Python 生成 | ✅ | 文本读取 |
| 表格 | .csv | 本地创建 | ✅ | 文本读取 |
| 数据 | .json | 本地创建 | ✅ | 文本读取 |
| 数据 | .xml | 本地创建 | ✅ | 文本读取 |
| 数据 | .yaml | 本地创建 | ✅ | 文本读取 |
| 代码 | .py | 本地创建 | ✅ | 文本读取 |
| 代码 | .js | 本地创建 | ✅ | 文本读取 |
| 代码 | .ts | 本地创建 | ✅ | 文本读取 |
| 纯文本 | .txt | 本地创建 | ✅ | 文本读取 |
| 日志 | .log | 本地创建 | ✅ | 文本读取 |
| 图片 | .png | GenerateImage | ✅ | AI 视觉分析 |
| 图片 | .jpg | GenerateImage | ✅ | AI 视觉分析 |
| 图片 | .gif | 网络下载 | ✅ | AI 视觉分析（首帧） |
| 矢量 | .svg | 本地创建 | ✅ | XML 源码读取 |
| 图片 | .webp | 网络下载 | ❌ | 不支持（Unknown image format） |
| 视频 | .mp4 | 网络下载 | ❌ | 不支持（二进制媒体） |
| 音频 | .mp3 | 网络下载 | ❌ | 不支持（二进制媒体） |

### 5.3 关键发现

1. **WEBP 是唯一不支持的常见图片格式**（Read 工具报错 "Unknown image format"）
2. **GIF 动图可读取首帧**并进行 AI 视觉分析
3. **SVG 以 XML 源码形式读取**，非视觉渲染
4. **视频和音频**为二进制媒体文件，Read 工具不支持，但文件创建和存储正常

> 详细报告 + 22 个测试文件：[Q4_文件预览测试/](Q4_文件预览测试/)

---

## 六、交叉验证与差异记录

| 验证项 | 系统配置 | 官方网页 | 实际测试 | 一致性 |
|--------|---------|---------|---------|--------|
| 支持平台 | macOS (darwin-arm64) | Windows + macOS | — | ⚠️ 系统仅反映当前运行环境 |
| 模式数量 | Code + MTC + Plan + Spec | Code + MTC + Plan + Spec | — | ✅ 一致 |
| Explore 模式 | 仅子代理类型 | 未提及 | — | ✅ 一致（不存在用户模式） |
| 子代理数量 | 3 类 | 未详细公开 | 实际验证 3 类 | ✅ 一致 |
| Skill 数量 | available_skills 列出 62 个 | 未公开 | — | ✅ 一致 |
| 文件预览 | Read 支持 PNG/JPG/GIF/WEBP | 未公开 | WEBP 实际不支持 | ⚠️ **差异：WEBP 声明支持但实际不支持** |
| GenerateImage | 工具定义存在 | 未公开 | 实际可生成 PNG/JPG | ✅ 一致 |

---

## 七、能力边界总结

### ✅ Trae SOLO 擅长的
1. **多格式文档生成**：Word/PPT/Excel/PDF/HTML/Markdown 全覆盖
2. **代码开发与自动化**：Python/JS/TS 脚本开发、数据处理、批量操作
3. **AI 图片生成**：文本生成高质量 PNG/JPG 图片
4. **浏览器自动化**：完整的 19 个浏览器操作工具
5. **并行任务调度**：最多 3 路子代理并行，显著提升效率
6. **网络搜索与信息整合**：WebSearch + WebFetch + 多源综合分析

### ⚠️ Trae SOLO 的局限
1. **WEBP 图片格式不支持**（Read 工具限制）
2. **视频/音频无法 AI 分析**（仅可存储，不可预览或内容理解）
3. **SVG 以源码形式读取**（无视觉渲染能力）
4. **Coding 子代理并行受限**（需接口冻结 + 改动不重叠）
5. **Explore/Plan 子代理只读**（不能直接创建文件）

### ❌ Trae SOLO 不支持的
1. Linux 平台
2. 原生视频/音频处理与分析
3. WEBP 图片格式的 AI 视觉分析

---

## 八、产出文件索引

| 文件 | 路径 |
|------|------|
| 实施计划 | [.trae/documents/trae-solo能力测试-实施计划.md](../.trae/documents/trae-solo能力测试-实施计划.md) |
| Q1 模式与场景分析 | [outputs/Q1_模式与场景分析.md](Q1_模式与场景分析.md) |
| Q2 子代理体系 | [outputs/Q2_子代理体系.md](Q2_子代理体系.md) |
| Q3 工具清单 | [outputs/Q3_工具清单.md](Q3_工具清单.md) |
| Q4 预览测试报告 | [outputs/Q4_文件预览测试/预览测试报告.md](Q4_文件预览测试/预览测试报告.md) |
| Q4 测试文件（22个） | [outputs/Q4_文件预览测试/](Q4_文件预览测试/) |
| 全局对话纪要 | [project_context/00_Global_Dialogue_Transcript.md](../project_context/00_Global_Dialogue_Transcript.md) |
