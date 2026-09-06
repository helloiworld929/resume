# 王之彦 · 个人履历网站

基于 Vue 3 + Vite + Vue Router 的个人简历网站。履历内容集中在 `src/data/resume.ts`，新增项目时在 `projects` 数组中按现有字段追加即可，详情页会自动使用项目的 `slug` 生成路由。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages

仓库已提供 `.github/workflows/deploy-pages.yml`。将代码推送到 GitHub 仓库的 `main` 分支后，Actions 会自动构建并发布 `dist`：

1. 在 GitHub 仓库进入 `Settings -> Pages`，将 `Source` 选择为 `GitHub Actions`。
2. 推送代码，等待 `Deploy resume to GitHub Pages` 工作流完成。
3. 访问 `https://你的用户名.github.io/仓库名/`。

如果工作流在 `actions/deploy-pages` 步骤报 `404 Not Found`，先确认仓库的 `Settings -> Pages -> Build and deployment -> Source` 已选择 `GitHub Actions`，并重新运行工作流。这个错误表示 Pages 站点尚未启用，不是 Vue 构建失败。

网站使用 Hash 路由，项目详情地址形如 `https://你的用户名.github.io/仓库名/#/projects/notifyflow`，刷新不会因 GitHub Pages 没有后端回退而 404。

GitHub Pages 只托管简历前端，羽悦和 NotifyFlow 作为独立项目部署。项目演示地址通过构建变量统一配置，当前默认值为本地开发地址。项目部署到服务器后，在仓库 `Settings -> Secrets and variables -> Actions -> Variables` 中替换为公网 IP 和端口，重新运行工作流即可：

```text
VITE_YUYUE_DEMO_URL=http://服务器公网IP:8080
VITE_NOTIFYFLOW_DEMO_URL=http://服务器公网IP:8081/tasks
```

变量会在 Actions 构建时写入静态页面。未设置时会保留 `localhost` 默认值，只适合本地开发。

项目源码仓库和演示地址在 `src/data/resume.ts` 中维护，新增项目时按现有字段追加即可。
