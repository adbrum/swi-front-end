import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-swi.herokuapp.com',
});

export default api;
