# Aneko Blog

基于 Astro 构建的个人博客，使用 Tailwind CSS 样式框架，支持 GitHub 卡片嵌入、文章搜索、目录导航等功能

**演示站点：** [blog.aneko.ink](https://blog.aneko.ink)

## 功能特点

- 响应式设计，支持移动端和桌面端
- 浅色主题，金色强调色设计
- 页面加载动画和滚动交互效果
- 文章搜索功能（⌘K）
- 目录导航（TOC）
- GitHub 卡片嵌入支持

## 技术栈

- **框架**: Astro
- **样式**: Tailwind CSS
- **包管理**: npm

## 项目结构

```
blog/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── ArticleCard.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── HeroCarousel.astro
│   │   ├── Pagination.astro
│   │   ├── SearchDialog.astro
│   │   ├── Sidebar.astro
│   │   └── TOC.astro
│   ├── content/blog/        # 博客文章（Markdown）
│   ├── layouts/             # 布局组件
│   ├── pages/               # 页面路由
│   ├── plugins/             # Markdown 插件（GitHub 卡片）
│   ├── styles/              # 全局样式
│   ├── utils/               # 工具函数
│   └── content.config.ts    # 内容配置
├── public/                  # 静态资源
├── tailwind.config.js       # Tailwind 配置
├── astro.config.mjs         # Astro 配置
├── tsconfig.json            # TypeScript 配置
└── wrangler.toml            # Cloudflare Pages 部署配置
```

## 自定义站点

### 1. 站点配置

**基本配置**
- 修改 `src/layouts/BaseLayout.astro` 中的标题和描述
- 修改 `src/components/Header.astro` 中的导航链接
- 修改 `src/components/Footer.astro` 中的页脚信息

### 2. 颜色主题

在 `tailwind.config.js` 中修改颜色配置：

```javascript
colors: {
  primary: '#ffffff',      // 主背景色
  secondary: '#f8f8f8',   // 次背景色
  accent: {
    red: '#c0a062',       // 强调色
    gold: '#c0a062',      // 金色强调
  },
  text: {
    DEFAULT: '#1a1a1a',   // 主文本色
    muted: '#666666',     // 次要文本色
  },
}
```

### 3. 字体配置

在 `tailwind.config.js` 中修改字体：

```javascript
fontFamily: {
  logo: ['Josefin Sans', 'sans-serif'],    // Logo字体
  heading: ['Playfair Display', 'serif'],  // 标题字体
  body: ['DM Sans', 'sans-serif'],         // 正文字体
}
```

### 4. 内容修改

**页面文件位置：**
- `src/pages/index.astro` - 首页
- `src/pages/about.astro` - 关于页面
- `src/pages/blog/` - 博客文章
- `src/pages/archive.astro` - 归档页面

**组件文件位置：**
- `src/components/Header.astro` - 头部导航栏
- `src/components/Footer.astro` - 页脚
- `src/components/HeroCarousel.astro` - 首页轮播图
- `src/components/ArticleCard.astro` - 文章卡片
- `src/components/SearchDialog.astro` - 搜索对话框
- `src/components/Sidebar.astro` - 侧边栏
- `src/components/TOC.astro` - 文章目录
- `src/components/Pagination.astro` - 分页组件

### 5. 静态资源

- `public/` - 存放图片、图标等静态资源
- `public/favicon.ico` - 网站图标
- `public/favicon.jpg` - 头像图标
- `public/images/` - 图片资源
- `public/animations.js` - 动画脚本

## 部署

项目支持部署到 Cloudflare Workers：

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 部署到 Cloudflare Workers
npx wrangler deploy
```

## 许可证

MIT License