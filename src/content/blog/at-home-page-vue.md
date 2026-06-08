---
title: "开源 ATBSPB-个人主页"
description: "At - Home Page - Vue | 基于 zyyo 主页，使用 Vue 3 + Vite 重构的个人主页项目，支持 Light/Dark 双主题切换"
pubDate: 2026-05-15
tags: ["Vue/Vite", "个人主页", "开源"]
author: "ATBSPB"
---

## 写在前面

> 一个好的个人主页，就像是你在互联网上的名片。

之前偶然发现了 [zyyo主页](https://zyyo.net/44.html)，被它的设计吸引，于是尝试用 Vue 重构一下，顺便加上一些自己的想法。

**At - Home Page - Vue** 就这么来的。

::github{repo="ATBSPB/at-home-page-vue"}

## 技术选型

Vue 3 + Vite 的组合：

- **Vue 3** — 响应式数据绑定，主题切换实现起来很自然
- **Vite** — 开发热更新快，构建也够用
- **CSS3** — 纯 CSS 变量做主题，没有额外依赖

## 项目结构

```
www - VUE/
├── public/                    # 静态资源目录
│   └── static/               # 静态文件
│       ├── fonts/            # 字体文件
│       ├── img/              # 壁纸、头像、二维码等图片
│       └── svg/              # SVG 图标
├── src/                      # 源代码目录
│   ├── components/           # Vue 组件
│   ├── composables/          # 组合式函数
│   ├── utils/                # 工具函数
│   ├── App.vue               # 根组件
│   ├── main.js               # 入口文件
│   └── style.css             # 全局样式
├── index.html                # HTML 模板
├── package.json              # 项目依赖配置
├── vite.config.js            # Vite 配置
├── wrangler.toml             # Cloudflare Pages 部署配置
└── LICENSE                   # MIT 许可证
```

## 主题系统

通过 CSS 变量 + `data-theme` 属性实现 Light/Dark 双主题切换，切换状态通过 Cookie 持久化，下次访问会记住偏好。

### Light 主题（默认）

```css
:root {
  --main_bg_color: url(/static/img/bz-light.jpg);
  --main_text_color: #ffffff;
  --gradient: linear-gradient(120deg, #bd34fe, #e0321b 30%, #41d1ff 60%);
  --item_bg_color: rgba(235, 240, 250, 0.25);
  --back_filter: 20px;
  --back_filter_color: rgba(0, 0, 0, 0.17);
}
```

### Dark 主题

```css
[data-theme="Dark"] {
  --main_bg_color: url(/static/img/bz-dark.jpg);
  --main_text_color: #fff;
  --gradient: linear-gradient(120deg, rgb(133, 62, 255), #f76cc6 30%, rgb(255, 255, 255) 60%);
  --item_bg_color: rgba(19, 20, 24, 0.35);
  --back_filter: 20px;
  --back_filter_color: rgba(0, 0, 0, 0.55);
}
```

### 主题切换逻辑

```javascript
const theme = ref('Light')

function toggleTheme() {
  theme.value = theme.value === 'Dark' ? 'Light' : 'Dark'
  setCookie('themeState', theme.value, 365)
  document.documentElement.dataset.theme = theme.value
}
```

## 自定义指南

### 模块修改位置

| 模块 | 文件 | 可修改内容 |
|------|------|-----------|
| 左侧侧边栏 | `src/components/LeftSidebar.vue` | 个人描述、标签、时间线 |
| 页面头部 | `src/components/PageHeader.vue` | 欢迎语、图标链接 |
| 页面内容 | `src/components/PageContent.vue` | 项目站点数据 |
| 页面底部 | `src/components/PageFooter.vue` | 版权信息 |

## 快速开始

```bash
# 克隆项目
git clone https://github.com/ATBSPB/at-home-page-vue.git

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

### 部署到 Cloudflare

```bash
npm run build
npx wrangler pages deploy dist
```

## 最后

项目花了不少时间打磨，如果对你有帮助，欢迎给个 Star 支持一下。

也欢迎提交 Issue 和 PR。

---

**协议：** MIT License

**地址：** [ATBSPB/at-home-page-vue](https://github.com/ATBSPB/at-home-page-vue)
