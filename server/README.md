# Piver Server

这是 Piver 的后端服务器。它提供了一个安全的 API 接口，用于与 Proxmox Virtual Environment (PVE) 进行通信。

## 改进

相比于开发版本，生产环境版本 (`prod.ts`) 进行了以下改进：

1. 使用 `helmet` 中间件增强安全性。
2. 实现了 CORS 限制，只允许特定的前端域名访问。
3. 添加了速率限制，防止 API 滥用。
4. 使用正确的 SSL 证书验证。
5. 添加了请求参数验证。
6. 设置了请求超时。
7. 改进了错误处理和日志记录。
8. 只返回必要的登录信息，减少敏感数据暴露。
9. 添加了全局错误处理中间件。
10. 实现了优雅关闭，以便在服务器关闭时正确处理连接。
11. 使用环境变量进行配置管理。

## 使用说明

1. 安装依赖：
   ```
   npm install
   ```

2. 安装额外的生产环境依赖：
   ```
   npm install helmet express-rate-limit dotenv
   ```

3. 配置环境变量：
   创建一个 `.env` 文件，并设置以下变量：
   ```
   PORT=3001
   ALLOWED_ORIGIN=https://your-frontend-domain.com
   CA_CERT_PATH=path/to/your/ca-certificate.pem
   ```

4. 启动开发服务器：
   ```
   yarn run dev
   ```

5. 启动生产服务器：
   ```
   yarn run build
   yarn run prod
   ```

## 注意事项

- 确保将 `CA_CERT_PATH` 设置为正确的 CA 证书路径。
- 在生产环境中，建议使用 PM2 或类似的进程管理器来运行服务器。
- 定期更新依赖包以确保安全性。
- 监控服务器日志，及时发现和处理潜在问题。
- 考虑使用 HTTPS 来加密服务器与客户端之间的通信。

## 开发环境

对于开发环境，使用 `dev.ts`。它禁用了证书验证，适合在本地开发和测试时使用。