import axios from '../lib/axiosDefault';

export const HandleLogin = async payload => {
  const response = axios.post(`/auth/signin`, payload);
  return response;
};

export const HandleLoadUser = async () => {
  const response = axios.get(`/auth`);
  return response;
};
