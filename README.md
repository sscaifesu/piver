# Pviwer

Pviwer 是一个用于管理 Proxmox Virtual Environment (PVE) 的现代化 Web 应用程序。它提供了一个直观、用户友好的界面，使用户能够轻松地管理和监控他们的 PVE 环境。

## 项目特点

- 基于 React 的响应式前端界面
- 安全的后端 API，用于与 PVE 服务器通信
- 支持多服务器管理
- 本地存储登录信息，提高用户体验
- 灵活的服务器设置，支持自定义地址、端口和认证方式

## 技术栈

- 前端：React, TypeScript, Axios
- 后端：Node.js, Express
- 构建工具：Create React App

## 快速开始

1. 克隆仓库：
   ```
   git clone https://github.com/sscaifesu/pviwer.git
   cd pviwer
   ```

2. 安装依赖：
   ```
   yarn install
   ```

3. 启动前端服务：
   ```
   yarn run start
   ```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

5. 启动后端服务（开发环境）：
   ```
   cd server
   yarn install
   yarn run dev
   ```  

## 启动后端服务（生产环境）
   ```
   cd server
   yarn install
   yarn run prod
   ```  

请参考 `server/README.md` 文件了解后端服务器的部署说明。

## 贡献

欢迎贡献代码、报告问题或提出新功能建议。请查看 `CONTRIBUTING.md` 文件了解更多信息。

## 许可证

本项目采用 Apache-2.0 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 更新日志

有关版本更新的详细信息，请查看 [CHANGELOG.md](CHANGELOG.md) 文件。
