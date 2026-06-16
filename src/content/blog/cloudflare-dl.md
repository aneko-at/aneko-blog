---
title: "Cloudflare 免费代理搭建教程"
description: "永久可用+免费域名｜10分钟搭建｜详细教程"
pubDate: 2026-05-01
tags: ["Cloudflare", "代理", "开源"]
author: "aneko"
---

## Cloudflare 免费代理搭建教程

使用 [cmliu](https://github.com/cmliu) 开发的 edgetunnel 项目，通过 Cloudflare Pages 部署 VLESS 协议的 V2Ray 代理，永久可用，无需服务器。

::github{repo="cmliu/edgetunnel"}

---

### 一、域名托管

首先需要一个域名，可选择已有的或以下免费域名：

- [DigitalPlat](https://digitalplat.org/)
- [DNSHE](https://www.dnshe.com/)

将域名托管到 [Cloudflare](https://www.cloudflare.com/)：

1. 注册并登录 Cloudflare，点击 **添加** > **连接域**
2. 输入域名，选择 **Free** 计划
3. 按照提示将 Cloudflare 提供的 DNS 名称服务器地址更新到你的域名注册商
4. 等待生效后，域名即成功托管

> 也可使用阿里云、腾讯云等 DNS 服务。

<img src="/images/blog/domain-hosting.png" alt="域名托管" />

---

### 二、项目搭建

#### 1. 创建 KV 空间

Cloudflare 导航栏：**存储和数据库** > **Worker KV**，创建 KV 空间，名称随意。

<img src="/images/blog/create-kv-space.png" alt="创建 KV 空间" />

#### 2. 创建 Pages

Cloudflare 导航栏：**计算** > **Workers 和 Pages** > **创建应用程序**，点击下方的 **开始使用**

- 项目名称随意填写
- 上传 edgetunnel 源码

<img src="/images/blog/create-pages.png" alt="创建 Pages" />

#### 3. 配置自定义域

部署后点击 **继续处理站点**，在 **自定义域** 中输入子域名，例如：`edgetunnel.example.com`

点击 **继续** > **激活域**，Cloudflare 会自动添加 DNS 解析记录。

#### 4. 设置环境变量

**设置** > **变量和机密** > **添加**

| 字段 | 值 |
|------|-----|
| 类型 | 文本 |
| 变量名 | `ADMIN`（大写） |
| 变量值 | 你的管理员密码（建议使用复杂密码） |

#### 5. 绑定 KV 空间

**设置** > **绑定** > **添加** > **KV 命名空间**

| 字段 | 值 |
|------|-----|
| 变量名称 | `KV`（大写） |
| KV 空间 | 选择刚创建的 KV 空间 |

#### 6. 重新部署

点击 **创建部署**，再次上传 edgetunnel 源码。

---

### 三、面板设置

访问 `https://你的子域名/admin`，密码为设置的 `ADMIN` 变量值。

将节点链接或自适应订阅地址导入代理软件，支持 VLESS、Trojan 等协议。

如需自定义优选订阅地址或 ProxyIP，可点击 **"我是高手！我就是要折腾！"**。

#### 优选订阅地址

```
Cm.Soso.Edu.Kg
Sub.Cmliussss.Net
Owo.O00o.Ooo
```

#### PROXYIP 订阅

```
Cm.Soso.Edu.Kg
Sub.Cmliussss.Net
Owo.O00o.Ooo
```

#### 常用代理软件

| 系统 | 软件 |
|------|------|
| Windows | [V2rayN](https://github.com/2dust/v2rayN/releases) / [Clash.Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) |
| Android | [V2rayNG](https://github.com/2dust/v2rayNG/releases) / [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
