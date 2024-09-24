import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import https from 'https';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const agent = new https.Agent({  
  rejectUnauthorized: false
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

  try {
    console.log('发送请求的数据:', { serverAddress, serverPort, username, password, authMethod });
    const response = await axios.post(`https://${serverAddress}:${serverPort}/api2/json/access/ticket`, {
      username,
      password,
      realm: authMethod
    }, { httpsAgent: agent });

    res.json(response.data);
  } catch (error) {
    console.error('登录失败:', error instanceof Error ? error.message : String(error));
    res.status(500).json({ message: '登录失败，请检查您的服务器地址和凭据' });
  }
});

app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});