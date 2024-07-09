// src/services/http.js
import axios from 'axios';
import FingerprintJS2 from 'fingerprintjs2';

const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// 生成设备指纹
const getFingerprint = () => {
  return new Promise((resolve) => {
    FingerprintJS2.get((components) => {
      const values = components.map((component) => component.value);
      const fingerprint = FingerprintJS2.x64hash128(values.join(''), 31);
      resolve(fingerprint);
    });
  });
};

// 请求拦截器
instance.interceptors.request.use(
  async (config) => {
    const fingerprint = await getFingerprint();
    config.headers['Device-Fingerprint'] = fingerprint;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
