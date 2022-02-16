import axios from "../lib/axiosDefault";

export const ApiGetListVariant = async (search, page) => {
  const response = axios.get(
    `/variant?search=${search || ""}&page=${page || ""}`
  );
  return response;
};

export const ApiAddListVariant = async payload => {
  const response = axios.post(`/variant`, payload);
  return response;
};

export const ApiDetailListVariant = async (id, categoryId) => {
  const response = axios.get(
    `/variant/detail?id=${id || ""}&categoryId=${categoryId || ""}`
  );
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
