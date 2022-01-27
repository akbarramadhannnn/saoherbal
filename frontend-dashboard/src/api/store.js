import axios from '../lib/axiosDefault';

export const ApiGetListStore = async () => {
  const response = await axios.get(`/store`);
  return response;
};

export const ApiAddListStore = async payload => {
  const response = await axios.post(`/store`, payload);
  return response;
};

export const ApiDetailListStore = async id => {
  const response = await axios.get(`/store/detail?id=${id}`);
  return response;
};

export const ApiUpdateListStore = async (id, payload) => {
  const response = axios.put(`/store/${id}`, payload);
  return response;
};

export const ApiDeleteListStore = async id => {
  const response = axios.delete(`/store/${id}`);
  return response;
};
