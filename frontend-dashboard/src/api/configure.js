import axios from "../lib/axiosDefault";

export const ApiGetListConfigure = async () => {
  const response = await axios.get(`/configure`);
  return response;
};

export const ApiGetListConfigureDetail = async configureId => {
  const response = await axios.get(
    `/configure/detail?configureId=${configureId}`
  );
  return response;
};

export const ApiAddConfigure = async payload => {
  const response = await axios.post(`/configure`, payload);
  return response;
};

export const ApiAddConfigureDetail = async payload => {
  const response = await axios.post(`/configure/detail`, payload);
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
