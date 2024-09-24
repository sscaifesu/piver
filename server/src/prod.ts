import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://your-frontend-domain.com'
}));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

const agent = new https.Agent({
  ca: fs.readFileSync(process.env.CA_CERT_PATH || 'path/to/your/ca-certificate.pem'),
  rejectUnauthorized: true
});

interface LoginRequest {
  serverAddress: string;
  serverPort: string;
  username: string;
  password: string;
  authMethod: string;
}

app.post('/api/login', async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { serverAddress, serverPort, username, password, authMethod } = req.body;

  if (!serverAddress || !serverPort || !username || !password || !authMethod) {
    return res.status(400).json({ message: '请提供所有必要的登录信息' });
  }

  try {
    const response = await axios.post(`https://${serverAddress}:${serverPort}/api2/json/access/ticket`, {
      username,
      password,
      realm: authMethod
    }, { 
      httpsAgent: agent,
      timeout: 10000
    });

    const { ticket, CSRFPreventionToken, username: responseUsername } = response.data.data;
    res.json({ ticket, CSRFPreventionToken, username: responseUsername });
  } catch (error) {
    console.error('登录失败:', error instanceof Error ? error.message : String(error));
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({ message: '登录失败，请检查您的服务器地址和凭据' });
    } else if (axios.isAxiosError(error) && error.request) {
      res.status(503).json({ message: '无法连接到服务器，请稍后再试' });
    } else {
      res.status(500).json({ message: '发生未知错误，请稍后再试' });
    }
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM 信号接收到，关闭服务器');
  app.listen().close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});