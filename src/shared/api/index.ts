import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1/amcTracker',
  timeout: 1000,
  maxRedirects: 2
});
