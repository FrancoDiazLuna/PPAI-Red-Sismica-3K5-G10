import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Cambiar al puerto de tu backend si es diferente
});

export default api;