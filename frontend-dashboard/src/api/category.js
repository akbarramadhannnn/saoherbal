import axios from '../lib/axiosDefault';

export const ApiGetListCategory = async => {
  const response = axios.get(`/category`);
  return response;
};

export const ApiAddListCategory = async payload => {
  const response = axios.post(`/category`, payload);
  return response;
};

export const ApiDetailListCategory = async id => {
  const response = axios.get(`/category/detail?id=${id}`);
  return response;
};

export const ApiUpdateListCategory = async (id, payload) => {
  const response = axios.put(`/category/${id}`, payload);
  return response;
};

export const ApiDeleteListCategory = async id => {
  const response = axios.delete(`/category/${id}`);
  return response;
};
