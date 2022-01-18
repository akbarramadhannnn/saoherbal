import axios from "axios";

export const HandleLogin = async payload => {
  const response = axios.post(`/auth/signin`, payload);
  return response;
};

export const HandleLoadUser = async () => {
  const response = axios.get(`/auth`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};
