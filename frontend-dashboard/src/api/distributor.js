import axios from "../lib/axiosDefault";

export const ApiGetListDistributor = async (search, page) => {
  const response = await axios.get(
    `/distributor?search=${search || ""}&page=${page || ""}`
  );
  return response;
};

export const ApiGetListAllDistributor = async () => {
  const response = await axios.get(`/distributor/all`);
  return response;
};

export const ApiAddListDistributor = async payload => {
  const response = await axios.post(`/distributor`, payload);
  return response;
};

export const ApiDetailListDistributor = async id => {
  const response = await axios.get(`/distributor/detail?id=${id}`);
  return response;
};

export const ApiUpdateListDistributor = async (id, payload) => {
  const response = axios.put(`/distributor/${id}`, payload);
  return response;
};

export const ApiDeleteListDistributor = async id => {
  const response = axios.delete(`/distributor/${id}`);
  return response;
};
