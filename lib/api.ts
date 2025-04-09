import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export const fetchSongs = async () => {
  const response = await apiClient.get('/songs');
  return response.data;
};
