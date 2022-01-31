import axios from "../lib/axiosDefault";

export const ApiGetListTransaction = async () => {
  const response = await axios.get(`/transaction`);
  return response;
};

export const ApiAddLisTransaction = async (payload) => {
  const response = await axios.post(`/transaction`, payload);
  return response;
};

export const ApiDetailListTransaction = async (code) => {
  const response = await axios.get(`/transaction/detail?code=${code}`);
  return response;
};

// export const ApiUpdateListCategory = async (id, payload) => {
//   const response = axios.put(`/category/${id}`, payload);
//   return response;
// };

// export const ApiDeleteListCategory = async id => {
//   const response = axios.delete(`/category/${id}`);
//   return response;
// };
