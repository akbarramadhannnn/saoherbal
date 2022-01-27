import axios from "../lib/axiosDefault";

export const ApiGetListProduct = async () => {
  const response = await axios.get(`/product`);
  return response;
};

export const ApiAddListProduct = async payload => {
  const response = await axios.post(`/product`, payload);
  return response;
};

export const ApiDetailListProduct = async id => {
  const response = await axios.get(`/product/detail?id=${id}`);
  return response;
};

export const ApiUpdateListProduct = async (id, payload) => {
  const response = axios.put(`/product/${id}`, payload);
  return response;
};

export const ApiDeleteListProduct = async id => {
  const response = axios.delete(`/product/${id}`);
  return response;
};
