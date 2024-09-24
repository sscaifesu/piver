import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import './App.css';
import logo from './Loner.svg';
import axios from 'axios';

interface FormData {
  serverAddress: string;
  serverPort: string;
  username: string;
  password: string;
  authMethod: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>(() => {
    // 从 localStorage 中获取保存的数据，如果没有则使用默认值
    const savedData = localStorage.getItem('loginFormData');
    return savedData ? JSON.parse(savedData) : {
      serverAddress: '',
      serverPort: '',
      username: '',
      password: '',
      authMethod: 'pam'
    };
  });

  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // 当 formData 变化时，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('loginFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'serverPort' && value === '' ? '8006' : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.serverAddress) {
      alert('请在设置中填写服务器地址');
      setShowSettings(true);
      return;
    }
    try {
      console.log('发送请求的数据:', formData);
      const response = await axios.post('/api/login', formData);
      console.log('登录成功:', response.data);
      // 在这里处理登录成功的逻辑，例如跳转到主页面
    } catch (error) {
      const err = error as any;
      console.error('登录失败:', err.response ? err.response.data : err.message);
      alert('登录失败，请检查您的服务器地址和凭据');
    }
  };

  const handleReset = () => {
    setFormData(prevData => ({
      ...prevData,
      username: '',
      password: ''
    }));
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
      setShowSettings(false);
    }
  };

  useEffect(() => {
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  return (
    <div className="App">
      <div className="animated-shape circle shape1"></div>
      <div className="animated-shape square shape2"></div>
      <div className="animated-shape triangle shape3"></div>
      <div className="animated-shape circle shape4"></div>
      <div className="animated-shape square shape5"></div>
      <div className="animated-shape circle shape6"></div>
      <div className="animated-shape square shape7"></div>
      <div className="animated-shape triangle shape8"></div>
      <div className="animated-shape circle shape9"></div>
      <div className="animated-shape square shape10"></div>
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1>业务平台</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-reset" onClick={handleReset}>重置</button>
            <button type="button" className="btn-settings" onClick={toggleSettings}>设置</button>
            <button type="submit" className="btn-submit">登录</button>
          </div>
        </form>
      </div>
      {showSettings && (
        <div className="settings-container" ref={settingsRef}>
          <div className="settings-header">
            <h2>服务器设置</h2>
          </div>
          <div className="form-group">
            <label htmlFor="serverAddress">服务器地址</label>
            <input
              type="text"
              id="serverAddress"
              name="serverAddress"
              value={formData.serverAddress}
              onChange={handleChange}
              placeholder="请输入服务器地址"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="serverPort">服务器端口</label>
            <input
              type="text"
              id="serverPort"
              name="serverPort"
              value={formData.serverPort}
              onChange={handleChange}
              placeholder="默认:8006"
              required
            />
          </div>
          <div className="form-group form-group-inline">
            <label htmlFor="authMethod">认证方式</label>
            <select
              id="authMethod"
              name="authMethod"
              value={formData.authMethod}
              onChange={handleChange}
              required
            >
              <option value="pam">PAM</option>
              <option value="pve">PVE</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;