# Vue.js 技能增强项目

这是一个专为提升Vue.js技能而设计的综合性学习项目，通过实际开发任务来掌握Vue.js的核心概念和高级特性。

## 🎯 学习目标

- 掌握Vue 3 Composition API
- 熟练使用TypeScript与Vue结合
- 理解组件化开发思想
- 掌握状态管理（Pinia）
- 学会路由管理和导航守卫
- 掌握API集成和数据处理
- 学会测试和调试技巧

## 🚀 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **状态管理**: Pinia
- **路由**: Vue Router
- **UI组件**: 自定义组件
- **测试**: Vitest

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   ├── training/       # 培训相关组件
│   └── tasks/          # 任务相关组件
├── composables/        # 组合式函数
├── pages/              # 页面组件
├── router/             # 路由配置
├── stores/             # 状态管理
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
└── assets/             # 静态资源
```

## 🎓 培训模块

### 模块1: 组件化开发基础
- 创建可复用组件
- Props和Emits的使用
- 插槽（Slots）的应用
- 组件生命周期
- 组件通信方式

### 模块2: Composition API深入
- ref和reactive的区别
- computed和watch的使用
- 生命周期钩子的应用
- 自定义组合式函数
- 依赖注入（provide/inject）

### 模块3: 状态管理实践
- Pinia store的创建和使用
- State、Getters、Actions
- 模块化状态管理
- 状态持久化
- 类型安全的store

### 模块4: 路由和导航
- Vue Router基础配置
- 动态路由和嵌套路由
- 导航守卫
- 路由参数和查询
- 程序化导航

### 模块5: API集成和数据处理
- HTTP客户端封装
- 错误处理机制
- 数据缓存策略
- 表单处理和验证
- 文件上传功能

### 模块6: 高级特性和最佳实践
- 自定义指令
- 插件开发
- 性能优化技巧
- 代码分割和懒加载
- TypeScript高级类型

### 模块7: 测试和调试
- 单元测试编写
- 组件测试
- 端到端测试
- 调试技巧
- 性能监控

## 🏃‍♂️ 快速开始

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 类型检查
```bash
npm run type-check
```

### 代码检查
```bash
npm run lint
```

---

# Project Setup and Launch (English)

This section provides an English quick-start guide with OS-specific preparation and commands to run the site.

## Prerequisites

- Node.js ≥ 18.x (recommended LTS)
- npm ≥ 9.x (or pnpm/yarn if preferred)
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

## Setup on Windows (PowerShell)

```powershell
# 1) Clone (if needed)
git clone <your-repo-url>
cd <your-repo-folder>

# 2) Install dependencies
npm install

# 3) Configure environment (optional but recommended)
# Create .env.local from template
Copy-Item .env.local.example .env.local
# Edit .env.local to add your values (see below)

# 4) Start dev server
npm run dev
# Open http://localhost:5173/

# Expose to LAN (optional)
npm run dev -- --host
```

## Setup on macOS (zsh)

```bash
# 1) Clone (if needed)
git clone <your-repo-url>
cd <your-repo-folder>

# 2) Install dependencies
npm install

# 3) Configure environment (optional but recommended)
cp .env.local.example .env.local
# Edit .env.local to add your values (see below)

# 4) Start dev server
npm run dev
# Open http://localhost:5173/

# Expose to LAN (optional)
npm run dev -- --host
```

## Environment configuration (.env.local)

Copy `.env.local.example` to `.env.local` and fill your values:

```
VITE_OIDC_ISSUER=https://your-issuer
VITE_OIDC_CLIENT_ID=your-client-id
VITE_OIDC_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_OIDC_LOGOUT_REDIRECT_URI=http://localhost:5173/
VITE_OIDC_SCOPES=openid profile email
```

These variables enable OpenID Connect login. You can configure the issuer, client id and redirect URIs for your identity provider.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type check then build production assets
- `npm run preview` — preview the production build locally
- `npm run type-check` — run TypeScript checks
- `npm run lint` — run ESLint

## Launch

```bash
# Development
npm run dev
# Production build
npm run build
# Preview production (simple HTTP server)
npm run preview
```

## Notes

- If port `5173` is busy, Vite will pick another one (e.g. `5174`); the terminal shows the actual URL.
- To serve over your local network, use `npm run dev -- --host`.
- After editing `.env.local`, restart the dev server so changes take effect.


## 📚 学习路径

### 第一阶段（1-2周）: 基础巩固
1. 完成组件化开发基础模块
2. 练习Composition API的使用
3. 掌握基本的TypeScript集成

### 第二阶段（2-3周）: 进阶应用
1. 学习状态管理和路由
2. 实现API集成
3. 开发完整的功能模块

### 第三阶段（1-2周）: 高级特性
1. 掌握高级Vue特性
2. 学习性能优化
3. 实现测试覆盖

## 🛠️ 实践项目

### 任务管理系统
一个完整的任务管理应用，包含以下功能：
- 用户认证和权限管理
- 任务的CRUD操作
- 任务分类和标签
- 任务状态跟踪
- 数据统计和可视化
- 响应式设计

## 📈 评估标准

### 代码质量
- TypeScript类型安全性
- 组件的可复用性
- 代码的可读性和维护性
- 遵循Vue.js最佳实践

### 功能完整性
- 所有核心功能正常运作
- 良好的用户体验
- 响应式设计实现
- 性能优化到位

## 🔧 开发建议

1. **循序渐进**: 按照模块顺序学习，确保基础扎实
2. **多练习**: 理论学习后要及时实践，加深理解
3. **看源码**: 阅读Vue.js源码，理解内部实现原理
4. **做笔记**: 记录学习过程中的重点和难点
5. **问问题**: 遇到问题及时寻求帮助，不要卡太久

## 📖 推荐资源

- [Vue.js官方文档](https://vuejs.org/)
- [Vue Router文档](https://router.vuejs.org/)
- [Pinia文档](https://pinia.vuejs.org/)
- [TypeScript文档](https://www.typescriptlang.org/)
- [Vite文档](https://vitejs.dev/)

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

MIT License
