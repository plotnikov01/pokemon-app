import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.defaults.headers.common = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const get = async (URL: string) => {
  return await axiosClient.get(`${URL}`).then((response) => response);
};

export const post = async (URL: string, payload?: unknown) => {
  return await axiosClient.post(`${URL}`, payload).then((response) => response);
};

export const patch = async (URL: string, payload?: unknown) => {
  return await axiosClient.patch(`${URL}`, payload).then((response) => response);
};

export const _delete = async (URL: string) => {
  return await axiosClient.delete(`${URL}`).then((response) => response);
};

const apiClient = {
  post,
  get,
  patch,
  _delete,
};

export { apiClient };
