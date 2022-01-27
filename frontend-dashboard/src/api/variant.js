import axios from "../lib/axiosDefault";

export const ApiGetListVariant = async categoryId => {
  const response = axios.get(`/variant?categoryId=${categoryId || ""}`);
  return response;
};

export const ApiAddListVariant = async payload => {
  const response = axios.post(`/variant`, payload);
  return response;
};

export const ApiDetailListVariant = async id => {
  const response = axios.get(`/variant/detail?id=${id}`);
  return response;
};

export const ApiUpdateListVariant = async (id, payload) => {
  const response = axios.put(`/variant/${id}`, payload);
  return response;
};

export const ApiDeleteListVariant = async id => {
  const response = axios.delete(`/variant/${id}`);
  return response;
};
