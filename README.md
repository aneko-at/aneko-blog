# AT Blog

一个使用 Astro 构建的个人博客，采用 Tailwind CSS 进行样式设计。

## 功能特点

- 响应式设计，支持移动端和桌面端
- 博客文章列表、分页和详情页
- 归档页面，按时间线浏览文章
- 关于页面，展示个人信息和理念
- 浅色主题，金色强调色设计
- 页面加载动画和滚动交互效果
- 文章搜索功能（⌘K）
- 目录导航（TOC）
- GitHub 卡片嵌入支持

## 技术栈

- **框架**: Astro
- **样式**: Tailwind CSS
- **包管理**: npm

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
├── src/
│   ├── components/     # 可复用组件
│   ├── content/blog/   # 博客文章（Markdown）
│   ├── layouts/        # 布局组件
│   ├── pages/          # 页面路由
│   ├── plugins/        # Markdown 插件
│   ├── styles/         # 全局样式
│   └── utils/          # 工具函数
├── public/             # 静态资源
├── tailwind.config.js  # Tailwind 配置
└── astro.config.mjs    # Astro 配置
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
- `public/favicon.svg` - 网站图标
- `public/images/` - 图片资源

## 许可证

MIT License