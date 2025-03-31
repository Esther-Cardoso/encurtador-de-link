import axios from 'axios';

export const key = 'ff4d38665da15d84c1fe88f0307f38d00f26446d';

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers: {
    Authorization: `Bearer ${key}`,
  },
});

export default api;
