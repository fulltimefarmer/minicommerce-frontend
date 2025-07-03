# MiniCommerce Frontend

一个基于 Next.js 的小型电商前端项目，展示现代化的 React 应用开发实践。

## 🛠️ 技术栈

- **框架**: Next.js 15.3.4
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **运行时**: Node.js
- **包管理器**: npm/yarn/pnpm/bun

## 📋 环境要求

在开始之前，请确保你的系统已安装以下软件：

- **Node.js**: 版本 18.0 或更高 ([下载地址](https://nodejs.org/))
- **npm**: 通常与 Node.js 一起安装
- **Git**: 用于克隆项目 ([下载地址](https://git-scm.com/))

### 检查环境

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version
```

## 🚀 本地运行步骤

### 1. 克隆项目

```bash
git clone <your-repository-url>
cd minicommerce-frontend
```

### 2. 安装依赖

选择你喜欢的包管理器：

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install

# 或使用 bun
bun install
```

### 3. 启动开发服务器

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev

# 或使用 bun
bun dev
```

### 4. 访问应用

开发服务器启动后，在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

页面会在你编辑代码时自动更新。

## 📁 项目结构

```
minicommerce-frontend/
├── src/
│   ├── app/                 # App Router 页面
│   │   ├── layout.tsx      # 全局布局
│   │   ├── page.tsx        # 首页
│   │   └── product/        # 产品相关页面
│   │       └── [id]/       # 动态产品详情页
│   ├── components/         # React 组件
│   │   ├── ProductList.tsx # 产品列表组件
│   │   └── UserInfo.tsx    # 用户信息组件
│   └── data/              # 静态数据
│       └── products.ts    # 产品数据
├── public/                # 静态资源
├── package.json          # 项目配置和依赖
├── tsconfig.json         # TypeScript 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── next.config.ts        # Next.js 配置
```

## ✨ 功能特性

- 📱 **响应式设计**: 适配各种设备屏幕
- 🎨 **现代化UI**: 使用 Tailwind CSS 构建
- 🔍 **产品展示**: 产品列表和详情页面
- 🚀 **性能优化**: Next.js 内置优化
- 📝 **TypeScript**: 类型安全的开发体验
- 🎯 **SEO友好**: 服务端渲染支持

## 🛠️ 可用脚本

在项目目录中，你可以运行以下命令：

### `npm run dev`
以开发模式启动应用，支持热重载和Turbopack。

### `npm run build`
构建生产版本的应用，输出到 `.next` 文件夹。

### `npm run start`
启动生产模式的服务器（需要先运行 `npm run build`）。

### `npm run lint`
运行 ESLint 检查代码质量。

## 🔧 开发指南

### 添加新页面

在 `src/app` 目录下创建新的文件夹和 `page.tsx` 文件：

```bash
mkdir src/app/新页面名
touch src/app/新页面名/page.tsx
```

### 添加新组件

在 `src/components` 目录下创建新的 React 组件：

```bash
touch src/components/NewComponent.tsx
```

### 修改样式

项目使用 Tailwind CSS，你可以直接在组件中使用 Tailwind 类名。

## 🚀 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com/new)
3. 导入你的 GitHub 仓库
4. Vercel 会自动配置和部署

### 其他平台

项目也可以部署到其他支持 Node.js 的平台，如：
- Netlify
- Railway
- Render
- AWS
- 自己的服务器

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

MIT License

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

如果在运行过程中遇到问题，请查看控制台输出或创建 Issue。
