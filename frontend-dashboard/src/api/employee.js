import axios from "../lib/axiosDefault";

export const ApiGetListEmployee = async (search, page) => {
  const response = await axios.get(
    `/employee?search=${search || ""}&page=${page || ""}`
  );
  return response;
};

export const ApiAddListEmployee = async payload => {
  const response = await axios.post(`/employee`, payload);
  return response;
};

export const ApiDetailListEmployee = async id => {
  const response = await axios.get(`/employee/detail?id=${id}`);
  return response;
};

export const ApiUpdateListEmployee = async (id, payload) => {
  const response = axios.put(`/employee/${id}`, payload);
  return response;
};

export const ApiDeleteListEmployee = async id => {
  const response = axios.delete(`/employee/${id}`);
  return response;
};

export const ApiUpdateActiveEmployee = async (id, payload) => {
  const response = axios.put(`/employee/update-active/${id}`, payload);
  return response;
};
