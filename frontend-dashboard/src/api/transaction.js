import axios from "../lib/axiosDefault";

export const ApiGetListTransaction = async => {
  const response = axios.get(`/transaction`);
  return response;
};

export const ApiAddLisTransaction = async payload => {
  const response = axios.post(`/transaction`, payload);
  return response;
};

// export const ApiDetailListCategory = async id => {
//   const response = axios.get(`/category/detail?id=${id}`);
//   return response;
// };

// export const ApiUpdateListCategory = async (id, payload) => {
//   const response = axios.put(`/category/${id}`, payload);
//   return response;
// };

// export const ApiDeleteListCategory = async id => {
//   const response = axios.delete(`/category/${id}`);
//   return response;
// };
