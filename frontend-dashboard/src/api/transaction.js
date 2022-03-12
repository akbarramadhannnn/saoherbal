import axios from "../lib/axiosDefault";

export const ApiGetListTransaction = async (search, transactionType, page) => {
  const response = await axios.get(
    `/transaction?search=${search || ""}&transactionType=${
      transactionType || ""
    }&page=${page || ""}`
  );
  return response;
};

export const ApiAddLisTransaction = async payload => {
  const response = await axios.post(`/transaction`, payload);
  return response;
};

export const ApiDetailListTransaction = async code => {
  const response = await axios.get(`/transaction/detail?code=${code}`);
  return response;
};

export const ApiUpdateTempoTransaction = async (id, payload) => {
  const response = await axios.put(`/transaction/tempo/${id}`, payload);
  return response;
};

export const ApiAddTransactionDueDate = async payload => {
  const response = await axios.post(`/transaction/due-date`, payload);
  return response;
};

export const ApiUpdateStatusTransactionDueDate = async (id, payload) => {
  const response = await axios.put(`/transaction/update-status/${id}`, payload);
  return response;
};

export const ApiAddTransactionTitipDetail = async payload => {
  const response = await axios.post(`/transaction/titip`, payload);
  return response;
};

export const ApiGetTransactionTotalSaleProduct = async (periodType, years, month) => {
  const response = await axios.get(
    `/transaction/total-sale-product?periodType=${periodType}&years=${years}&month=${month}`
  );
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
