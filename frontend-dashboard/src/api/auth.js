import axios from "../lib/axiosDefault";

export const HandleLogin = async payload => {
  const response = await axios.post(`/auth/signin`, payload);
  return response;
};

export const HandleLoadUser = async () => {
  const response = await axios.get(`/auth`);
  return response;
};

export const ApiGetDetailAuth = async employeeId => {
  const response = await axios.get(`/auth/detail?employeeId=${employeeId}`);
  return response;
};

export const ApiAddAuth = async payload => {
  const response = await axios.post(`/auth`, payload);
  return response;
};

export const ApiUpdateAuth = async (authId, payload) => {
  const response = await axios.put(`/auth/${authId}`, payload);
  return response;
};
