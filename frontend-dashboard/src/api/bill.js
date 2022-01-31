import axios from "../lib/axiosDefault";

export const ApiGetListBill = async type => {
  const response = await axios.get(`/bill?type=${type || ""}`);
  return response;
};

// export const ApiAddListCategory = async payload => {
//   const response = axios.post(`/category`, payload);
//   return response;
// };

export const ApiDetailListBill = async billNumber => {
  const response = axios.get(`/bill/detail?billNumber=${billNumber}`);
  return response;
};

export const ApiUpdatePaymentStatusBill = async (billNumber, payload) => {
  const response = axios.put(
    `/bill/update-payment-status/${billNumber}`,
    payload
  );
  return response;
};

// export const ApiDeleteListCategory = async id => {
//   const response = axios.delete(`/category/${id}`);
//   return response;
// };
